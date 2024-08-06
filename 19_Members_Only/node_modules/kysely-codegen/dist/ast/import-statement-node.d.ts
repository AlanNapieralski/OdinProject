import type { ImportClauseNode } from './import-clause-node';
import { NodeType } from './node-type';
export declare class ImportStatementNode {
    readonly imports: ImportClauseNode[];
    readonly moduleName: string;
    readonly type = NodeType.IMPORT_STATEMENT;
    constructor(moduleName: string, imports: ImportClauseNode[]);
}
