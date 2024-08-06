"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplateNode = void 0;
const node_type_1 = require("./node-type");
class TemplateNode {
    constructor(params, expression) {
        this.type = node_type_1.NodeType.TEMPLATE;
        this.params = params;
        this.expression = expression;
    }
}
exports.TemplateNode = TemplateNode;
//# sourceMappingURL=template-node.js.map