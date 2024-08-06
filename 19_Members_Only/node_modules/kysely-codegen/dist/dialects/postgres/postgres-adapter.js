"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgresAdapter = void 0;
const ast_1 = require("../../ast");
const core_1 = require("../../core");
const transformer_1 = require("../../transformer");
class PostgresAdapter extends core_1.Adapter {
    constructor() {
        super(...arguments);
        // From https://node-postgres.com/features/types:
        // "node-postgres will convert a database type to a JavaScript string if it doesn't have a
        // registered type parser for the database type. Furthermore, you can send any type to the
        // PostgreSQL server as a string and node-postgres will pass it through without modifying it in
        // any way."
        this.defaultScalar = new ast_1.IdentifierNode('string');
        this.defaultSchema = 'public';
        this.definitions = {
            Circle: new ast_1.ObjectExpressionNode([
                new ast_1.PropertyNode('x', new ast_1.IdentifierNode('number')),
                new ast_1.PropertyNode('y', new ast_1.IdentifierNode('number')),
                new ast_1.PropertyNode('radius', new ast_1.IdentifierNode('number')),
            ]),
            Int8: new ast_1.ColumnType(new ast_1.IdentifierNode('string'), new ast_1.UnionExpressionNode([
                new ast_1.IdentifierNode('string'),
                new ast_1.IdentifierNode('number'),
                new ast_1.IdentifierNode('bigint'),
            ])),
            Interval: new ast_1.ColumnType(new ast_1.IdentifierNode('IPostgresInterval'), new ast_1.UnionExpressionNode([
                new ast_1.IdentifierNode('IPostgresInterval'),
                new ast_1.IdentifierNode('number'),
            ])),
            Json: transformer_1.JSON_DEFINITION,
            JsonArray: transformer_1.JSON_ARRAY_DEFINITION,
            JsonObject: transformer_1.JSON_OBJECT_DEFINITION,
            JsonPrimitive: transformer_1.JSON_PRIMITIVE_DEFINITION,
            JsonValue: transformer_1.JSON_VALUE_DEFINITION,
            Numeric: new ast_1.ColumnType(new ast_1.IdentifierNode('string'), new ast_1.UnionExpressionNode([
                new ast_1.IdentifierNode('string'),
                new ast_1.IdentifierNode('number'),
            ])),
            Point: new ast_1.ObjectExpressionNode([
                new ast_1.PropertyNode('x', new ast_1.IdentifierNode('number')),
                new ast_1.PropertyNode('y', new ast_1.IdentifierNode('number')),
            ]),
            Timestamp: new ast_1.ColumnType(new ast_1.IdentifierNode('Date'), new ast_1.UnionExpressionNode([
                new ast_1.IdentifierNode('Date'),
                new ast_1.IdentifierNode('string'),
            ])),
        };
        this.imports = {
            IPostgresInterval: new ast_1.ModuleReferenceNode('postgres-interval'),
        };
        // These types have been found through experimentation in Adminer and in the 'pg' source code.
        this.scalars = {
            bit: new ast_1.IdentifierNode('string'),
            bool: new ast_1.IdentifierNode('boolean'), // Specified as "boolean" in Adminer.
            box: new ast_1.IdentifierNode('string'),
            bpchar: new ast_1.IdentifierNode('string'), // Specified as "character" in Adminer.
            bytea: new ast_1.IdentifierNode('Buffer'),
            cidr: new ast_1.IdentifierNode('string'),
            circle: new ast_1.IdentifierNode('Circle'),
            date: new ast_1.IdentifierNode('Timestamp'),
            float4: new ast_1.IdentifierNode('number'), // Specified as "real" in Adminer.
            float8: new ast_1.IdentifierNode('number'), // Specified as "double precision" in Adminer.
            inet: new ast_1.IdentifierNode('string'),
            int2: new ast_1.IdentifierNode('number'), // Specified in 'pg' source code.
            int4: new ast_1.IdentifierNode('number'), // Specified in 'pg' source code.
            int8: new ast_1.IdentifierNode('Int8'), // Specified as "bigint" in Adminer.
            interval: new ast_1.IdentifierNode('Interval'),
            json: new ast_1.IdentifierNode('Json'),
            jsonb: new ast_1.IdentifierNode('Json'),
            line: new ast_1.IdentifierNode('string'),
            lseg: new ast_1.IdentifierNode('string'),
            macaddr: new ast_1.IdentifierNode('string'),
            money: new ast_1.IdentifierNode('string'),
            numeric: new ast_1.IdentifierNode('Numeric'),
            oid: new ast_1.IdentifierNode('number'), // Specified in 'pg' source code.
            path: new ast_1.IdentifierNode('string'),
            point: new ast_1.IdentifierNode('Point'),
            polygon: new ast_1.IdentifierNode('string'),
            text: new ast_1.IdentifierNode('string'),
            time: new ast_1.IdentifierNode('string'),
            timestamp: new ast_1.IdentifierNode('Timestamp'),
            timestamptz: new ast_1.IdentifierNode('Timestamp'),
            tsquery: new ast_1.IdentifierNode('string'),
            tsvector: new ast_1.IdentifierNode('string'),
            txid_snapshot: new ast_1.IdentifierNode('string'),
            uuid: new ast_1.IdentifierNode('string'),
            varbit: new ast_1.IdentifierNode('string'), // Specified as "bit varying" in Adminer.
            varchar: new ast_1.IdentifierNode('string'), // Specified as "character varying" in Adminer.
            xml: new ast_1.IdentifierNode('string'),
        };
    }
}
exports.PostgresAdapter = PostgresAdapter;
//# sourceMappingURL=postgres-adapter.js.map