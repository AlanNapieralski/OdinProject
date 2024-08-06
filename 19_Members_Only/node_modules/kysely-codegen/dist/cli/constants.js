"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VALID_DIALECTS = exports.LOG_LEVEL_NAMES = exports.DEFAULT_URL = exports.DEFAULT_LOG_LEVEL = exports.DEFAULT_OUT_FILE = void 0;
const path_1 = require("path");
const core_1 = require("../core");
exports.DEFAULT_OUT_FILE = (0, path_1.join)(process.cwd(), 'node_modules', 'kysely-codegen', 'dist', 'db.d.ts');
exports.DEFAULT_LOG_LEVEL = core_1.LogLevel.WARN;
exports.DEFAULT_URL = 'env(DATABASE_URL)';
exports.LOG_LEVEL_NAMES = [
    'silent',
    'info',
    'warn',
    'error',
    'debug',
];
exports.VALID_DIALECTS = [
    'postgres',
    'mysql',
    'sqlite',
    'mssql',
    'libsql',
    'bun-sqlite',
];
//# sourceMappingURL=constants.js.map