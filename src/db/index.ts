import { drizzle } from 'drizzle-orm/d1';
import { getRequestContext } from '@cloudflare/next-on-pages';
import * as schema from './schema';

/**
 * Returns a Drizzle ORM instance connected to the Cloudflare D1 database.
 *
 * Uses getRequestContext() from @cloudflare/next-on-pages which works in:
 *  - Production (Cloudflare Pages runtime)
 *  - Local `next dev` with wrangler pages dev
 */
export async function getDb() {
  const { env } = getRequestContext();
  const dbBinding = (env as unknown as { DB: D1Database }).DB;

  if (!dbBinding) {
    throw new Error("D1 Database binding 'DB' not found. Ensure it is connected in the Cloudflare Pages dashboard under Settings > Functions > D1 database bindings.");
  }

  return drizzle(dbBinding, { schema });
}
