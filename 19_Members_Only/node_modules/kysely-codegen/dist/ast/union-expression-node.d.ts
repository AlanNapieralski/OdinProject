import type { ExpressionNode } from './expression-node';
import { NodeType } from './node-type';
export declare class UnionExpressionNode {
    readonly args: ExpressionNode[];
    readonly type = NodeType.UNION_EXPRESSION;
    constructor(args: ExpressionNode[]);
}
