"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LiteralNode = void 0;
const node_type_1 = require("./node-type");
class LiteralNode {
    constructor(value) {
        this.type = node_type_1.NodeType.LITERAL;
        this.value = value;
    }
}
exports.LiteralNode = LiteralNode;
//# sourceMappingURL=literal-node.js.map