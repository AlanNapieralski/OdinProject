import { DatabaseMetadata } from '../../core';
import type { IntrospectOptions } from '../../introspector';
import { Introspector } from '../../introspector';
export declare class BunSqliteIntrospector extends Introspector<any> {
    introspect(options: IntrospectOptions<any>): Promise<DatabaseMetadata>;
}
