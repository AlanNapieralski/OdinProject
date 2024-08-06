import { DatabaseMetadata } from '../../core';
import type { IntrospectOptions } from '../../introspector';
import { Introspector } from '../../introspector';
import type { MysqlDB } from './mysql-db';
export declare class MysqlIntrospector extends Introspector<MysqlDB> {
    #private;
    introspect(options: IntrospectOptions<MysqlDB>): Promise<DatabaseMetadata>;
}
