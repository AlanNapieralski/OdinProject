import type { ExpressionNode } from './expression-node';
import { NodeType } from './node-type';
export declare class ExtendsClauseNode {
    readonly falseType: ExpressionNode;
    readonly trueType: ExpressionNode;
    readonly checkType: ExpressionNode;
    readonly extendsType: ExpressionNode;
    readonly type = NodeType.EXTENDS_CLAUSE;
    constructor(checkType: ExpressionNode, extendsType: ExpressionNode, trueType: ExpressionNode, falseType: ExpressionNode);
}
