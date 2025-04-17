import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
	server: {
		DATABASE_URL: z.string().url(),
		NODE_ENV: z
			.enum(["development", "test", "production"])
			.default("development"),
		BETTER_AUTH_SECRET: z.string(),
		AUTH_TRUSTED_ORIGINS: z.string(),
	},

	client: {
		NEXT_PUBLIC_BASE_URL: z.string().url(),
	},

	runtimeEnv: {
		// Server
		DATABASE_URL: process.env.DATABASE_URL,
		NODE_ENV: process.env.NODE_ENV,
		BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
		AUTH_TRUSTED_ORIGINS: process.env.AUTH_TRUSTED_ORIGINS,
		// Client
		NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
	},

	skipValidation: !!process.env.SKIP_ENV_VALIDATION,

	emptyStringAsUndefined: true,
});
