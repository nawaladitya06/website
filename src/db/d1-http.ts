/**
 * D1 HTTP Client — Local Dev Fallback
 * Implements the Cloudflare D1Database interface using the REST API.
 * Used automatically by getDb() when the Workers D1 binding is unavailable.
 */

const CF_API = 'https://api.cloudflare.com/client/v4';

interface CfD1Response {
  success: boolean;
  errors: { message: string }[];
  result: {
    results: Record<string, unknown>[];
    success: boolean;
    meta: Record<string, unknown>;
  }[];
}

class D1HttpPreparedStatement {
  private _sql: string;
  private _params: unknown[] = [];

  constructor(
    private accountId: string,
    private databaseId: string,
    private apiToken: string,
    sql: string,
  ) {
    this._sql = sql;
  }

  bind(...values: unknown[]): this {
    this._params = values;
    return this;
  }

  private async _execute(): Promise<{ results: Record<string, unknown>[]; meta: Record<string, unknown> }> {
    const url = `${CF_API}/accounts/${this.accountId}/d1/database/${this.databaseId}/query`;

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.apiToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ sql: this._sql, params: this._params }),
    });

    const json = (await res.json()) as CfD1Response;

    if (!json.success || !json.result?.[0]?.success) {
      const msg = json.errors?.map((e) => e.message).join(', ') || 'Unknown D1 HTTP error';
      throw new Error(`[D1 HTTP] ${msg}`);
    }

    return { results: json.result[0].results, meta: json.result[0].meta };
  }

  async all<T = Record<string, unknown>>(): Promise<{ results: T[]; success: boolean; meta: Record<string, unknown> }> {
    const { results, meta } = await this._execute();
    return { results: results as T[], success: true, meta };
  }

  async first<T = Record<string, unknown>>(colName?: string): Promise<T | null> {
    const { results } = await this._execute();
    if (!results.length) return null;
    if (colName !== undefined) return (results[0][colName] as T) ?? null;
    return results[0] as T;
  }

  async run(): Promise<{ results: undefined; success: boolean; meta: Record<string, unknown> }> {
    const { meta } = await this._execute();
    return { results: undefined, success: true, meta };
  }

  async raw<T = unknown[]>(): Promise<T[]> {
    const { results } = await this._execute();
    return results as unknown as T[];
  }
}

export class D1HttpDatabase {
  constructor(
    private accountId: string,
    private databaseId: string,
    private apiToken: string,
  ) {}

  prepare(sql: string): D1HttpPreparedStatement {
    return new D1HttpPreparedStatement(this.accountId, this.databaseId, this.apiToken, sql);
  }

  async exec(sql: string) {
    return this.prepare(sql).run();
  }

  async batch(statements: D1HttpPreparedStatement[]) {
    return Promise.all(statements.map((s) => s.all()));
  }

  dump(): Promise<ArrayBuffer> {
    throw new Error('[D1 HTTP] dump() is not supported via the REST API.');
  }
}
