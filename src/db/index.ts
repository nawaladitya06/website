import { drizzle } from 'drizzle-orm/d1';
import * as schema from './schema';
import { D1HttpDatabase } from './d1-http';

// D1 database ID from wrangler.jsonc
const D1_DATABASE_ID = '3493924d-1d62-4b7c-a479-0552e35314b1';

/**
 * Returns true when a database connection is possible:
 *   1. Cloudflare Workers D1 binding is present (production / wrangler dev), OR
 *   2. CLOUDFLARE_ACCOUNT_ID + CLOUDFLARE_API_TOKEN are set in .env.local (next dev)
 */
export function isDbAvailable(env: any): boolean {
  if (env?.DB) return true;
  return !!(process.env.CLOUDFLARE_ACCOUNT_ID && process.env.CLOUDFLARE_API_TOKEN);
}

/**
 * Returns a Drizzle ORM instance connected to Cloudflare D1.
 *
 * Priority:
 *  1. Workers D1 binding (env.DB)  — used in production & wrangler dev
 *  2. Cloudflare D1 REST API       — used in `next dev` when env vars are set
 */
export function getDb(env: any) {
  // --- Workers runtime: use the real D1 binding ---
  if (env?.DB) {
    return drizzle(env.DB, { schema });
  }

  // --- Local next dev: fall back to the D1 HTTP REST API ---
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  const apiToken  = process.env.CLOUDFLARE_API_TOKEN;

  if (accountId && apiToken) {
    const httpDb = new D1HttpDatabase(accountId, D1_DATABASE_ID, apiToken);
    return drizzle(httpDb as any, { schema });
  }

  throw new Error(
    '[DB] No database connection available in local dev.\n' +
    'Add these two lines to your .env.local file:\n' +
    '  CLOUDFLARE_ACCOUNT_ID=<your-account-id>\n' +
    '  CLOUDFLARE_API_TOKEN=<your-api-token>'
  );
}
