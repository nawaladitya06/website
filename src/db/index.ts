import { drizzle } from 'drizzle-orm/d1';
import { getCloudflareContext } from '@opennextjs/cloudflare';
import * as schema from './schema';

/**
 * Returns a Drizzle ORM instance connected to the Cloudflare D1 database.
 *
 * Uses getCloudflareContext() which works in:
 *  - Production (Cloudflare Workers runtime)
 *  - Local `next dev` (via initOpenNextCloudflareForDev() in next.config.ts)
 */
export async function getDb() {
  const { env } = await getCloudflareContext({ async: true });
  return drizzle((env as any).DB, { schema });
}
