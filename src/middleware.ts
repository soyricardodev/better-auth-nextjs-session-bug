import { betterFetch } from "@better-fetch/fetch";
import { getSessionCookie } from "better-auth/cookies";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./auth/auth";

type Session = typeof auth.$Infer.Session;

type RouteConfig = {
	path: string;
	type: "public" | "protected";
};

const routes: RouteConfig[] = [
	// Public Routes
	{ path: "/login", type: "public" },
	{ path: "/register", type: "public" },
	{ path: "/", type: "public" },

	// Private Routes
	{ path: "/private", type: "protected" },
];

const IGNORE_PATHS = [
	"/api/auth",
];

function getRouteType(path: string): RouteConfig["type"] | null {
	const route = routes.find(
		(route) => path === route.path || path.startsWith(`${route.path}/`),
	);
	return route?.type ?? null;
}

function createRedirectResponse(request: NextRequest, redirectPath: string) {
	return NextResponse.redirect(new URL(redirectPath, request.url));
}

export async function middleware(request: NextRequest) {
	const path = request.nextUrl.pathname;

	// Check ignored paths
	if (IGNORE_PATHS.some((ignorePath) => path.startsWith(ignorePath))) {
		return;
	}

	const routeType = getRouteType(path);
	const sessionCookie = getSessionCookie(request);

	// Handle protected routes (non-public)
	if (!routeType && !sessionCookie) {
		return createRedirectResponse(request, `/login?redirectTo=${path}`);
	}

	if (routeType === "protected") {
		const { data: session } = await betterFetch<Session>(
			"/api/auth/get-session",
			{
				baseURL: request.nextUrl.origin,
				headers: {
					cookie: request.headers.get("cookie") ?? "",
				},
			},
		);

		if (session?.user?.role == null || session.user.role !== "admin") {
			console.log("no admin", session);
			return createRedirectResponse(
				request,
				`/login?redirectTo=${path}`,
			);
		}
	}

	return NextResponse.next();
}

export const config = {
	matcher: [
		"/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
		"/(api|trpc)(.*)",
	],
};
