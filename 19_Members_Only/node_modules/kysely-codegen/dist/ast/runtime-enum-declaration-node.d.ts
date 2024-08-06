import type { ExpressionNode } from './expression-node';
import { NodeType } from './node-type';
export declare class RuntimeEnumDeclarationNode {
    readonly body: ExpressionNode;
    readonly name: string;
    readonly type = NodeType.RUNTIME_ENUM_DECLARATION;
    constructor(name: string, body: ExpressionNode);
}
