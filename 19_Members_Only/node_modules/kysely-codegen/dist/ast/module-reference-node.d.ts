import { NodeType } from './node-type';
export declare class ModuleReferenceNode {
    readonly name: string;
    readonly type = NodeType.MODULE_REFERENCE;
    constructor(name: string);
}
