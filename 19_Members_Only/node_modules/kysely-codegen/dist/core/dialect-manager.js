"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _DialectManager_options;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DialectManager = void 0;
const dialects_1 = require("../dialects");
/**
 * Returns a dialect instance for a pre-defined dialect name.
 */
class DialectManager {
    constructor(options = { domains: true }) {
        _DialectManager_options.set(this, void 0);
        __classPrivateFieldSet(this, _DialectManager_options, options, "f");
    }
    getDialect(name) {
        switch (name) {
            case 'bun-sqlite':
                return new dialects_1.BunSqliteDialect();
            case 'libsql':
                return new dialects_1.LibsqlDialect();
            case 'mssql':
                return new dialects_1.MssqlDialect();
            case 'mysql':
                return new dialects_1.MysqlDialect();
            case 'postgres':
                return new dialects_1.PostgresDialect(__classPrivateFieldGet(this, _DialectManager_options, "f"));
            default:
                return new dialects_1.SqliteDialect();
        }
    }
}
exports.DialectManager = DialectManager;
_DialectManager_options = new WeakMap();
//# sourceMappingURL=dialect-manager.js.map