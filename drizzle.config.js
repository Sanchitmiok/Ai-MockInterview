import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./utils/schema.js",
  dialect: "postgresql",
  dbCredentials:{
    url:'postgresql://AiInterviewMocker_owner:skqWygj9v1Cn@ep-snowy-cherry-a1qvmnc9.ap-southeast-1.aws.neon.tech/AiInterviewMocker?sslmode=require'
  }
});