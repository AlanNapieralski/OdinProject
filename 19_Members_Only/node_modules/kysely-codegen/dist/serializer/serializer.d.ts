import type { AliasDeclarationNode, ArrayExpressionNode, ExportStatementNode, ExpressionNode, ExtendsClauseNode, GenericExpressionNode, IdentifierNode, ImportClauseNode, ImportStatementNode, InferClauseNode, InterfaceDeclarationNode, LiteralNode, MappedTypeNode, ObjectExpressionNode, PropertyNode, RuntimeEnumDeclarationNode, StatementNode, UnionExpressionNode } from '../ast';
export type SerializerOptions = {
    camelCase?: boolean;
    typeOnlyImports?: boolean;
};
/**
 * Creates a TypeScript output string from a codegen AST.
 */
export declare class Serializer {
    readonly camelCase: boolean;
    readonly typeOnlyImports: boolean;
    constructor(options?: SerializerOptions);
    serialize(nodes: StatementNode[]): string;
    serializeAliasDeclaration(node: AliasDeclarationNode): string;
    serializeArrayExpression(node: ArrayExpressionNode): string;
    serializeExportStatement(node: ExportStatementNode): string;
    serializeExpression(node: ExpressionNode): string;
    serializeExtendsClause(node: ExtendsClauseNode): string;
    serializeGenericExpression(node: GenericExpressionNode): string;
    serializeIdentifier(node: IdentifierNode): string;
    serializeImportClause(node: ImportClauseNode): string;
    serializeImportStatement(node: ImportStatementNode): string;
    serializeInferClause(node: InferClauseNode): string;
    serializeInterfaceDeclaration(node: InterfaceDeclarationNode): string;
    serializeLiteral(node: LiteralNode): string;
    serializeKey(key: string): string;
    serializeMappedType(node: MappedTypeNode): string;
    serializeObjectExpression(node: ObjectExpressionNode): string;
    serializeProperty(node: PropertyNode): string;
    serializeRuntimeEnum(node: RuntimeEnumDeclarationNode): string;
    serializeUnionExpression(node: UnionExpressionNode): string;
}
