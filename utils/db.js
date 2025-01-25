import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';
// const sql = neon(process.env.NEON_CONNECTION_STRING);
const sql = neon('postgresql://AiInterviewMocker_owner:skqWygj9v1Cn@ep-snowy-cherry-a1qvmnc9-pooler.ap-southeast-1.aws.neon.tech/AiInterviewMocker?sslmode=require');
export const db = drizzle(sql, { schema });

