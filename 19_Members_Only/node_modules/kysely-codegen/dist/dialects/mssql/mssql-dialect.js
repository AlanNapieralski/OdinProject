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
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _MssqlDialect_instances, _MssqlDialect_parseConnectionString;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MssqlDialect = void 0;
const kysely_1 = require("kysely");
const core_1 = require("../../core");
const mssql_adapter_1 = require("./mssql-adapter");
const mssql_introspector_1 = require("./mssql-introspector");
const DEFAULT_MSSQL_PORT = 1433;
class MssqlDialect extends core_1.Dialect {
    constructor() {
        super(...arguments);
        _MssqlDialect_instances.add(this);
        this.adapter = new mssql_adapter_1.MssqlAdapter();
        this.introspector = new mssql_introspector_1.MssqlIntrospector();
    }
    async createKyselyDialect(options) {
        const tarn = await Promise.resolve().then(() => __importStar(require('tarn')));
        const tedious = await Promise.resolve().then(() => __importStar(require('tedious')));
        const { database, password, port, server, userName } = await __classPrivateFieldGet(this, _MssqlDialect_instances, "m", _MssqlDialect_parseConnectionString).call(this, options.connectionString);
        return new kysely_1.MssqlDialect({
            tarn: {
                ...tarn,
                options: { min: 0, max: 1 },
            },
            tedious: {
                ...tedious,
                connectionFactory: () => {
                    return new tedious.Connection({
                        authentication: {
                            options: { password, userName },
                            type: 'default',
                        },
                        options: {
                            database,
                            port,
                            trustServerCertificate: true,
                        },
                        server,
                    });
                },
            },
        });
    }
}
exports.MssqlDialect = MssqlDialect;
_MssqlDialect_instances = new WeakSet(), _MssqlDialect_parseConnectionString = 
/**
 * @see https://www.connectionstrings.com/microsoft-data-sqlclient/using-a-non-standard-port/
 */
async function _MssqlDialect_parseConnectionString(connectionString) {
    const { parseConnectionString } = await Promise.resolve().then(() => __importStar(require('@tediousjs/connection-string')));
    const parsed = parseConnectionString(connectionString);
    const tokens = parsed.server.split(',');
    const server = tokens[0];
    const port = tokens[1]
        ? Number.parseInt(tokens[1], 10)
        : DEFAULT_MSSQL_PORT;
    return {
        database: parsed.database,
        password: parsed.password,
        port,
        server,
        userName: parsed['user id'],
    };
};
//# sourceMappingURL=mssql-dialect.js.map