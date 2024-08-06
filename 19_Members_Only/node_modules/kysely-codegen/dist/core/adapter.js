"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Adapter = void 0;
const ast_1 = require("../ast");
/**
 * Specifies settings for how code should be generated for the given database library.
 */
class Adapter {
    constructor() {
        this.defaultScalar = new ast_1.IdentifierNode('unknown');
        this.defaultSchema = null;
        this.definitions = {};
        this.imports = {};
        this.scalars = {};
    }
}
exports.Adapter = Adapter;
//# sourceMappingURL=adapter.js.map