import { NodeType } from './node-type';
import type { ObjectExpressionNode } from './object-expression-node';
export declare class InterfaceDeclarationNode {
    readonly body: ObjectExpressionNode;
    readonly name: string;
    readonly type = NodeType.INTERFACE_DECLARATION;
    constructor(name: string, body: ObjectExpressionNode);
}
