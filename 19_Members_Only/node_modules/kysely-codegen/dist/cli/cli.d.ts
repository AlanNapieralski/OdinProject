import type { DialectName } from '../core';
import { LogLevel } from '../core';
import type { LOG_LEVEL_NAMES } from './constants';
export type CliOptions = {
    camelCase?: boolean;
    dialectName?: DialectName | undefined;
    domains?: boolean;
    envFile?: string | undefined;
    excludePattern?: string | undefined;
    includePattern?: string | undefined;
    logLevel?: LogLevel;
    outFile?: string | undefined;
    print?: boolean;
    runtimeEnums?: boolean;
    schema?: string | undefined;
    typeOnlyImports?: boolean;
    url: string;
    verify?: boolean | undefined;
};
export type LogLevelName = (typeof LOG_LEVEL_NAMES)[number];
/**
 * Creates a kysely-codegen command-line interface.
 */
export declare class Cli {
    #private;
    generate(options: CliOptions): Promise<void>;
    parseOptions(args: string[], options?: {
        silent?: boolean;
    }): CliOptions;
    run(argv: string[]): Promise<void>;
}
