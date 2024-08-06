"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModuleReferenceNode = void 0;
const node_type_1 = require("./node-type");
class ModuleReferenceNode {
    constructor(name) {
        this.type = node_type_1.NodeType.MODULE_REFERENCE;
        this.name = name;
    }
}
exports.ModuleReferenceNode = ModuleReferenceNode;
//# sourceMappingURL=module-reference-node.js.map