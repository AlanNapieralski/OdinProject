import { NodeType } from './node-type';
export declare class InferClauseNode {
    readonly name: string;
    readonly type = NodeType.INFER_CLAUSE;
    constructor(name: string);
}
