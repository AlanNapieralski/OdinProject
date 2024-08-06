import type { ExpressionNode } from './expression-node';
import { NodeType } from './node-type';
export declare class ArrayExpressionNode {
    readonly type = NodeType.ARRAY_EXPRESSION;
    readonly values: ExpressionNode;
    constructor(values: ExpressionNode);
}
