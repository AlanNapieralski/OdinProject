import type { Kysely } from 'kysely';
import type { Dialect, Logger } from '../core';
import { Serializer } from '../serializer';
import { Transformer } from '../transformer';
export type GenerateOptions = {
    camelCase?: boolean;
    db: Kysely<any>;
    dialect: Dialect;
    excludePattern?: string;
    includePattern?: string;
    logger?: Logger;
    outFile?: string;
    print?: boolean;
    runtimeEnums?: boolean;
    schema?: string;
    serializer?: Serializer;
    transformer?: Transformer;
    typeOnlyImports?: boolean;
    verify?: boolean;
};
/**
 * Generates codegen output using specified options.
 */
export declare class Generator {
    generate(options: GenerateOptions): Promise<string>;
}
