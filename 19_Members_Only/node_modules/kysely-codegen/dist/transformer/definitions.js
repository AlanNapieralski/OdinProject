"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JSON_DEFINITION = exports.JSON_VALUE_DEFINITION = exports.JSON_PRIMITIVE_DEFINITION = exports.JSON_OBJECT_DEFINITION = exports.JSON_ARRAY_DEFINITION = exports.GLOBAL_DEFINITIONS = void 0;
const ast_1 = require("../ast");
exports.GLOBAL_DEFINITIONS = {
    /**
     * @see https://github.com/RobinBlomberg/kysely-codegen/issues/135
     */
    ArrayType: new ast_1.TemplateNode(['T'], new ast_1.ExtendsClauseNode(new ast_1.GenericExpressionNode('ArrayTypeImpl', [new ast_1.IdentifierNode('T')]), new ast_1.ArrayExpressionNode(new ast_1.InferClauseNode('U')), new ast_1.ArrayExpressionNode(new ast_1.IdentifierNode('U')), new ast_1.GenericExpressionNode('ArrayTypeImpl', [new ast_1.IdentifierNode('T')]))),
    /**
     * @see https://github.com/RobinBlomberg/kysely-codegen/issues/135
     */
    ArrayTypeImpl: new ast_1.TemplateNode(['T'], new ast_1.ExtendsClauseNode(new ast_1.IdentifierNode('T'), new ast_1.GenericExpressionNode('ColumnType', [
        new ast_1.InferClauseNode('S'),
        new ast_1.InferClauseNode('I'),
        new ast_1.InferClauseNode('U'),
    ]), new ast_1.GenericExpressionNode('ColumnType', [
        new ast_1.ArrayExpressionNode(new ast_1.IdentifierNode('S')),
        new ast_1.ArrayExpressionNode(new ast_1.IdentifierNode('I')),
        new ast_1.ArrayExpressionNode(new ast_1.IdentifierNode('U')),
    ]), new ast_1.ArrayExpressionNode(new ast_1.IdentifierNode('T')))),
    Generated: new ast_1.TemplateNode(['T'], new ast_1.ExtendsClauseNode(new ast_1.IdentifierNode('T'), new ast_1.GenericExpressionNode('ColumnType', [
        new ast_1.InferClauseNode('S'),
        new ast_1.InferClauseNode('I'),
        new ast_1.InferClauseNode('U'),
    ]), new ast_1.GenericExpressionNode('ColumnType', [
        new ast_1.IdentifierNode('S'),
        new ast_1.UnionExpressionNode([
            new ast_1.IdentifierNode('I'),
            new ast_1.IdentifierNode('undefined'),
        ]),
        new ast_1.IdentifierNode('U'),
    ]), new ast_1.GenericExpressionNode('ColumnType', [
        new ast_1.IdentifierNode('T'),
        new ast_1.UnionExpressionNode([
            new ast_1.IdentifierNode('T'),
            new ast_1.IdentifierNode('undefined'),
        ]),
        new ast_1.IdentifierNode('T'),
    ]))),
};
exports.JSON_ARRAY_DEFINITION = new ast_1.ArrayExpressionNode(new ast_1.IdentifierNode('JsonValue'));
exports.JSON_OBJECT_DEFINITION = new ast_1.MappedTypeNode(new ast_1.IdentifierNode('JsonValue'));
exports.JSON_PRIMITIVE_DEFINITION = new ast_1.UnionExpressionNode([
    new ast_1.IdentifierNode('boolean'),
    new ast_1.IdentifierNode('null'),
    new ast_1.IdentifierNode('number'),
    new ast_1.IdentifierNode('string'),
]);
exports.JSON_VALUE_DEFINITION = new ast_1.UnionExpressionNode([
    new ast_1.IdentifierNode('JsonArray'),
    new ast_1.IdentifierNode('JsonObject'),
    new ast_1.IdentifierNode('JsonPrimitive'),
]);
exports.JSON_DEFINITION = new ast_1.IdentifierNode('JsonValue');
//# sourceMappingURL=definitions.js.map