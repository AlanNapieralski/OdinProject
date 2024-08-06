"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
var _PostgresDialect_options;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgresDialect = void 0;
const kysely_1 = require("kysely");
const core_1 = require("../../core");
const postgres_adapter_1 = require("./postgres-adapter");
const postgres_introspector_1 = require("./postgres-introspector");
class PostgresDialect extends core_1.Dialect {
    constructor(options = { domains: true }) {
        super();
        _PostgresDialect_options.set(this, void 0);
        this.adapter = new postgres_adapter_1.PostgresAdapter();
        __classPrivateFieldSet(this, _PostgresDialect_options, options, "f");
        this.introspector = new postgres_introspector_1.PostgresIntrospector(this.adapter, __classPrivateFieldGet(this, _PostgresDialect_options, "f"));
    }
    async createKyselyDialect(options) {
        const { Pool } = await Promise.resolve().then(() => __importStar(require('pg')));
        return new kysely_1.PostgresDialect({
            pool: new Pool({
                connectionString: options.connectionString,
                ssl: options.ssl ? { rejectUnauthorized: false } : false,
            }),
        });
    }
}
exports.PostgresDialect = PostgresDialect;
_PostgresDialect_options = new WeakMap();
//# sourceMappingURL=postgres-dialect.js.map