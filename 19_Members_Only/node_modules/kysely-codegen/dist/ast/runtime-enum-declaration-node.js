"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RuntimeEnumDeclarationNode = void 0;
const node_type_1 = require("./node-type");
class RuntimeEnumDeclarationNode {
    constructor(name, body) {
        this.type = node_type_1.NodeType.RUNTIME_ENUM_DECLARATION;
        this.name = name;
        this.body = body;
    }
}
exports.RuntimeEnumDeclarationNode = RuntimeEnumDeclarationNode;
//# sourceMappingURL=runtime-enum-declaration-node.js.map