import type { Dialect } from './dialect';
export type DialectName = 'bun-sqlite' | 'libsql' | 'mssql' | 'mysql' | 'postgres' | 'sqlite';
export type DialectManagerOptions = {
    domains: boolean;
};
/**
 * Returns a dialect instance for a pre-defined dialect name.
 */
export declare class DialectManager {
    #private;
    constructor(options?: DialectManagerOptions);
    getDialect(name: DialectName): Dialect;
}
