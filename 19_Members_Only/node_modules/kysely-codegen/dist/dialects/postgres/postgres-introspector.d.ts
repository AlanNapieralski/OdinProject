import { DatabaseMetadata } from '../../core';
import type { IntrospectOptions } from '../../introspector';
import { Introspector } from '../../introspector';
import type { PostgresAdapter } from './postgres-adapter';
import type { PostgresDB } from './postgres-db';
export type PostgresIntrospectorOptions = {
    domains: boolean;
};
export declare class PostgresIntrospector extends Introspector<PostgresDB> {
    #private;
    readonly adapter: PostgresAdapter;
    constructor(adapter: PostgresAdapter, options?: PostgresIntrospectorOptions);
    introspect(options: IntrospectOptions<PostgresDB>): Promise<DatabaseMetadata>;
}
