import { MysqlDialect as KyselyMysqlDialect } from 'kysely';
import type { CreateKyselyDialectOptions } from '../../core';
import { Dialect } from '../../core';
import { MysqlAdapter } from './mysql-adapter';
import { MysqlIntrospector } from './mysql-introspector';
export declare class MysqlDialect extends Dialect {
    readonly adapter: MysqlAdapter;
    readonly introspector: MysqlIntrospector;
    createKyselyDialect(options: CreateKyselyDialectOptions): Promise<KyselyMysqlDialect>;
}
