"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const pg_1 = require("pg");
const kysely_1 = require("kysely");
const dialect = new kysely_1.PostgresDialect({
    pool: new pg_1.Pool({
        database: 'members_only',
        host: 'localhost',
        user: 'postgres',
        password: 'alano100',
        port: 5432,
        max: 10,
    })
});
exports.db = new kysely_1.Kysely({
    dialect,
});
//# sourceMappingURL=database.js.map