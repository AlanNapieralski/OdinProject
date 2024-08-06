import { SqliteDialect as KyselySqliteDialect } from 'kysely';
import type { CreateKyselyDialectOptions } from '../../core';
import { Dialect } from '../../core';
import { SqliteAdapter } from './sqlite-adapter';
import { SqliteIntrospector } from './sqlite-introspector';
export declare class SqliteDialect extends Dialect {
    readonly adapter: SqliteAdapter;
    readonly introspector: SqliteIntrospector;
    createKyselyDialect(options: CreateKyselyDialectOptions): Promise<KyselySqliteDialect>;
}
