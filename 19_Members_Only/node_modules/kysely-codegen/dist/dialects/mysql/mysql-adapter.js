"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MysqlAdapter = void 0;
const ast_1 = require("../../ast");
const core_1 = require("../../core");
const transformer_1 = require("../../transformer");
class MysqlAdapter extends core_1.Adapter {
    constructor() {
        super(...arguments);
        this.definitions = {
            Decimal: new ast_1.ColumnType(new ast_1.IdentifierNode('string'), new ast_1.UnionExpressionNode([
                new ast_1.IdentifierNode('string'),
                new ast_1.IdentifierNode('number'),
            ])),
            Geometry: new ast_1.UnionExpressionNode([
                new ast_1.IdentifierNode('LineString'),
                new ast_1.IdentifierNode('Point'),
                new ast_1.IdentifierNode('Polygon'),
                new ast_1.ArrayExpressionNode(new ast_1.IdentifierNode('Geometry')),
            ]),
            Json: new ast_1.ColumnType(new ast_1.IdentifierNode('JsonValue'), new ast_1.IdentifierNode('string'), new ast_1.IdentifierNode('string')),
            JsonArray: transformer_1.JSON_ARRAY_DEFINITION,
            JsonObject: transformer_1.JSON_OBJECT_DEFINITION,
            JsonPrimitive: transformer_1.JSON_PRIMITIVE_DEFINITION,
            JsonValue: transformer_1.JSON_VALUE_DEFINITION,
            LineString: new ast_1.ArrayExpressionNode(new ast_1.IdentifierNode('Point')),
            Point: new ast_1.ObjectExpressionNode([
                new ast_1.PropertyNode('x', new ast_1.IdentifierNode('number')),
                new ast_1.PropertyNode('y', new ast_1.IdentifierNode('number')),
            ]),
            Polygon: new ast_1.ArrayExpressionNode(new ast_1.IdentifierNode('LineString')),
        };
        // These types have been found through experimentation in Adminer.
        this.scalars = {
            bigint: new ast_1.IdentifierNode('number'),
            binary: new ast_1.IdentifierNode('Buffer'),
            bit: new ast_1.IdentifierNode('Buffer'),
            blob: new ast_1.IdentifierNode('Buffer'),
            char: new ast_1.IdentifierNode('string'),
            date: new ast_1.IdentifierNode('Date'),
            datetime: new ast_1.IdentifierNode('Date'),
            decimal: new ast_1.IdentifierNode('Decimal'),
            double: new ast_1.IdentifierNode('number'),
            float: new ast_1.IdentifierNode('number'),
            geomcollection: new ast_1.ArrayExpressionNode(new ast_1.IdentifierNode('Geometry')), // Specified as "geometrycollection" in Adminer.
            geometry: new ast_1.IdentifierNode('Geometry'),
            int: new ast_1.IdentifierNode('number'),
            json: new ast_1.IdentifierNode('Json'),
            linestring: new ast_1.IdentifierNode('LineString'),
            longblob: new ast_1.IdentifierNode('Buffer'),
            longtext: new ast_1.IdentifierNode('string'),
            mediumblob: new ast_1.IdentifierNode('Buffer'),
            mediumint: new ast_1.IdentifierNode('number'),
            mediumtext: new ast_1.IdentifierNode('string'),
            multilinestring: new ast_1.ArrayExpressionNode(new ast_1.IdentifierNode('LineString')),
            multipoint: new ast_1.ArrayExpressionNode(new ast_1.IdentifierNode('Point')),
            multipolygon: new ast_1.ArrayExpressionNode(new ast_1.IdentifierNode('Polygon')),
            point: new ast_1.IdentifierNode('Point'),
            polygon: new ast_1.IdentifierNode('Polygon'),
            set: new ast_1.IdentifierNode('unknown'),
            smallint: new ast_1.IdentifierNode('number'),
            text: new ast_1.IdentifierNode('string'),
            time: new ast_1.IdentifierNode('string'),
            timestamp: new ast_1.IdentifierNode('Date'),
            tinyblob: new ast_1.IdentifierNode('Buffer'),
            tinyint: new ast_1.IdentifierNode('number'),
            tinytext: new ast_1.IdentifierNode('string'),
            varbinary: new ast_1.IdentifierNode('Buffer'),
            varchar: new ast_1.IdentifierNode('string'),
            year: new ast_1.IdentifierNode('number'),
        };
    }
}
exports.MysqlAdapter = MysqlAdapter;
//# sourceMappingURL=mysql-adapter.js.map