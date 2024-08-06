"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MappedTypeNode = void 0;
const node_type_1 = require("./node-type");
class MappedTypeNode {
    constructor(value) {
        this.type = node_type_1.NodeType.MAPPED_TYPE;
        this.value = value;
    }
}
exports.MappedTypeNode = MappedTypeNode;
//# sourceMappingURL=mapped-type-node.js.map