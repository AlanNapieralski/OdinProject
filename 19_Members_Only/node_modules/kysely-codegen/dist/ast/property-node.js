"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertyNode = void 0;
const node_type_1 = require("./node-type");
class PropertyNode {
    constructor(key, value, comment = null) {
        this.type = node_type_1.NodeType.PROPERTY;
        this.comment = comment;
        this.key = key;
        this.value = value;
    }
}
exports.PropertyNode = PropertyNode;
//# sourceMappingURL=property-node.js.map