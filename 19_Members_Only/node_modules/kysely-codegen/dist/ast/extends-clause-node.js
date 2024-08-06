"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtendsClauseNode = void 0;
const node_type_1 = require("./node-type");
class ExtendsClauseNode {
    constructor(checkType, extendsType, trueType, falseType) {
        this.type = node_type_1.NodeType.EXTENDS_CLAUSE;
        this.checkType = checkType;
        this.extendsType = extendsType;
        this.trueType = trueType;
        this.falseType = falseType;
    }
}
exports.ExtendsClauseNode = ExtendsClauseNode;
//# sourceMappingURL=extends-clause-node.js.map