"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImportStatementNode = void 0;
const node_type_1 = require("./node-type");
class ImportStatementNode {
    constructor(moduleName, imports) {
        this.type = node_type_1.NodeType.IMPORT_STATEMENT;
        this.moduleName = moduleName;
        this.imports = imports;
    }
}
exports.ImportStatementNode = ImportStatementNode;
//# sourceMappingURL=import-statement-node.js.map