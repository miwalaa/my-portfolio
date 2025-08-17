import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import Posts from "./collections/Posts";

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000",
  collections: [Posts],
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL,
    },
  }),
  secret: process.env.PAYLOAD_SECRET || "supersecret",
});
