import { MssqlDialect as KyselyMssqlDialect } from 'kysely';
import type { CreateKyselyDialectOptions } from '../../core';
import { Dialect } from '../../core';
import { MssqlAdapter } from './mssql-adapter';
import { MssqlIntrospector } from './mssql-introspector';
export declare class MssqlDialect extends Dialect {
    #private;
    readonly adapter: MssqlAdapter;
    readonly introspector: MssqlIntrospector;
    createKyselyDialect(options: CreateKyselyDialectOptions): Promise<KyselyMssqlDialect>;
}
