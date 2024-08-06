import type { ExpressionNode } from '../ast';
import { ExportStatementNode, ImportStatementNode } from '../ast';
import type { DatabaseMetadata, Definitions, Dialect, EnumCollection, Imports, Scalars } from '../core';
import { SymbolCollection } from './symbol-collection';
export type TransformContext = {
    camelCase: boolean;
    defaultScalar: ExpressionNode;
    defaultSchema: string | null;
    definitions: Definitions;
    enums: EnumCollection;
    imports: Imports;
    metadata: DatabaseMetadata;
    runtimeEnums: boolean;
    scalars: Scalars;
    symbols: SymbolCollection;
};
export type TransformOptions = {
    camelCase?: boolean;
    defaultSchema?: string;
    dialect: Dialect;
    metadata: DatabaseMetadata;
    runtimeEnums?: boolean;
};
/**
 * Transforms database metadata into a TypeScript-compatible AST.
 */
export declare class Transformer {
    #private;
    transform(options: TransformOptions): (ExportStatementNode | ImportStatementNode)[];
}
