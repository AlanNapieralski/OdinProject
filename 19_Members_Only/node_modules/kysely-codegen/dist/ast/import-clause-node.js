"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImportClauseNode = void 0;
const node_type_1 = require("./node-type");
class ImportClauseNode {
    constructor(name, alias = null) {
        this.type = node_type_1.NodeType.IMPORT_CLAUSE;
        this.name = name;
        this.alias = alias;
    }
}
exports.ImportClauseNode = ImportClauseNode;
//# sourceMappingURL=import-clause-node.js.map