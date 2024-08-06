import type { CreateKyselyDialectOptions } from '../../core';
import { Dialect } from '../../core';
import { LibsqlAdapter } from './libsql-adapter';
import { LibsqlIntrospector } from './libsql-introspector';
export declare class LibsqlDialect extends Dialect {
    readonly adapter: LibsqlAdapter;
    readonly introspector: LibsqlIntrospector;
    createKyselyDialect(options: CreateKyselyDialectOptions): Promise<import("@libsql/kysely-libsql").LibsqlDialect>;
}
