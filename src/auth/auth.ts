import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { admin } from "better-auth/plugins";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db, schema } from "~/db";
import { env } from "~/env";

export const auth = betterAuth({
	emailAndPassword: {
		enabled: true,
		autoSignIn: true,
		requireEmailVerification: false
	},
	database: drizzleAdapter(db, {
		provider: "sqlite",
		schema: {
			user: schema.userTable,
			session: schema.sessionTable,
			account: schema.accountTable,
			verification: schema.verificationTable,
		},
	}),
	plugins: [admin(), nextCookies()],
	session: {
		cookieCache: {
			enabled: true,
			maxAge: 5 * 60,
		},
	},
	trustedOrigins: [
		env.NEXT_PUBLIC_BASE_URL,
		...env.AUTH_TRUSTED_ORIGINS.split(","),
	],
});
