import { NodeType } from './node-type';
import type { PropertyNode } from './property-node';
export declare class ObjectExpressionNode {
    readonly properties: PropertyNode[];
    readonly type = NodeType.OBJECT_EXPRESSION;
    constructor(properties: PropertyNode[]);
}
