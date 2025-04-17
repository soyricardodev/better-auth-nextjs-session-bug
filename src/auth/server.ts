import { headers } from "next/headers";
import { auth } from "./auth";

export const getServerSession = async () => {
	const serverSession = await auth.api.getSession({
		headers: await headers(),
	});

	console.log("serverSession", serverSession);

	return serverSession;
};

export type GetSession = Awaited<ReturnType<typeof getServerSession>>;
