import type { DialectName } from './dialect-manager';
import type { Logger } from './logger';
/**
 * @see https://dev.mysql.com/doc/refman/8.0/en/connecting-using-uri-or-key-value-pairs.html
 */
export type ParseConnectionStringOptions = {
    connectionString: string;
    dialectName?: DialectName;
    envFile?: string;
    logger?: Logger;
};
export type ParsedConnectionString = {
    connectionString: string;
    inferredDialectName: DialectName;
};
/**
 * Parses a connection string URL or loads it from an environment file.
 * Upon success, it also returns which dialect was inferred from the connection string.
 */
export declare class ConnectionStringParser {
    #private;
    parse(options: ParseConnectionStringOptions): ParsedConnectionString;
}
