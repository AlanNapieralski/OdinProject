"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MssqlIntrospector = void 0;
const core_1 = require("../../core");
const introspector_1 = require("../../introspector");
class MssqlIntrospector extends introspector_1.Introspector {
    async introspect(options) {
        const tables = await this.getTables(options);
        const enums = new core_1.EnumCollection();
        return new core_1.DatabaseMetadata(tables, enums);
    }
}
exports.MssqlIntrospector = MssqlIntrospector;
//# sourceMappingURL=mssql-introspector.js.map