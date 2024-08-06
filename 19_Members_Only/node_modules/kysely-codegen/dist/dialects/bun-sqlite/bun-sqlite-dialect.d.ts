import type { CreateKyselyDialectOptions } from '../../core';
import { Dialect } from '../../core';
import { BunSqliteAdapter } from '../bun-sqlite';
import { BunSqliteIntrospector } from './bun-sqlite-introspector';
export declare class BunSqliteDialect extends Dialect {
    readonly adapter: BunSqliteAdapter;
    readonly introspector: BunSqliteIntrospector;
    createKyselyDialect(options: CreateKyselyDialectOptions): Promise<import("kysely-bun-worker").BunWorkerDialect>;
}
