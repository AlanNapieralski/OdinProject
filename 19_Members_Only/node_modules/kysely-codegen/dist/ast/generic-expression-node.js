"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenericExpressionNode = void 0;
const node_type_1 = require("./node-type");
class GenericExpressionNode {
    constructor(name, args) {
        this.type = node_type_1.NodeType.GENERIC_EXPRESSION;
        this.name = name;
        this.args = args;
    }
}
exports.GenericExpressionNode = GenericExpressionNode;
//# sourceMappingURL=generic-expression-node.js.map