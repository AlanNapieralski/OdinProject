"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BunSqliteIntrospector = void 0;
const core_1 = require("../../core");
const introspector_1 = require("../../introspector");
class BunSqliteIntrospector extends introspector_1.Introspector {
    async introspect(options) {
        const tables = await this.getTables(options);
        const enums = new core_1.EnumCollection();
        return new core_1.DatabaseMetadata(tables, enums);
    }
}
exports.BunSqliteIntrospector = BunSqliteIntrospector;
//# sourceMappingURL=bun-sqlite-introspector.js.map