import { PostgresDialect as KyselyPostgresDialect } from 'kysely';
import type { CreateKyselyDialectOptions } from '../../core';
import { Dialect } from '../../core';
import { PostgresAdapter } from './postgres-adapter';
import { PostgresIntrospector } from './postgres-introspector';
export type PostgresDialectOptions = {
    domains: boolean;
};
export declare class PostgresDialect extends Dialect {
    #private;
    readonly adapter: PostgresAdapter;
    readonly introspector: PostgresIntrospector;
    constructor(options?: PostgresDialectOptions);
    createKyselyDialect(options: CreateKyselyDialectOptions): Promise<KyselyPostgresDialect>;
}
