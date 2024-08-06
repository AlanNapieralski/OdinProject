import { NodeType } from './node-type';
export type Literal = number | string;
export declare class LiteralNode<T extends Literal = Literal> {
    readonly type = NodeType.LITERAL;
    readonly value: T;
    constructor(value: T);
}
