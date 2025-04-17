import type { Config } from "drizzle-kit";

import { env } from "~/env";

export default {
	schema: "./src/db/schema.ts",
	dialect: "turso",
	dbCredentials: {
		url: env.DATABASE_URL,
	},
	tablesFilter: ["better_auth_bug_*"],
} satisfies Config;
