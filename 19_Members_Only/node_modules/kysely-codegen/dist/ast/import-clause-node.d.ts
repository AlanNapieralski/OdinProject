import { NodeType } from './node-type';
export declare class ImportClauseNode {
    readonly alias: string | null;
    readonly name: string;
    readonly type = NodeType.IMPORT_CLAUSE;
    constructor(name: string, alias?: string | null);
}
