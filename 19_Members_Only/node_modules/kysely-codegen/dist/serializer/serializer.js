"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Serializer = void 0;
const ast_1 = require("../ast");
const transformer_1 = require("../transformer");
const IDENTIFIER_REGEXP = /^[$A-Z_a-z][\w$]*$/;
/**
 * Creates a TypeScript output string from a codegen AST.
 */
class Serializer {
    constructor(options = {}) {
        this.camelCase = options.camelCase ?? false;
        this.typeOnlyImports = options.typeOnlyImports ?? true;
    }
    serialize(nodes) {
        let data = '';
        let i = 0;
        for (const node of nodes) {
            if (i >= 1) {
                data += '\n';
                if (node.type !== ast_1.NodeType.IMPORT_STATEMENT) {
                    data += '\n';
                }
            }
            switch (node.type) {
                case ast_1.NodeType.EXPORT_STATEMENT:
                    data += this.serializeExportStatement(node);
                    break;
                case ast_1.NodeType.IMPORT_STATEMENT:
                    data += this.serializeImportStatement(node);
                    break;
            }
            i++;
        }
        data += '\n';
        return data;
    }
    serializeAliasDeclaration(node) {
        const expression = node.body.type === ast_1.NodeType.TEMPLATE ? node.body.expression : node.body;
        let data = '';
        data += 'type ';
        data += node.name;
        if (node.body.type === ast_1.NodeType.TEMPLATE) {
            data += '<';
            for (let i = 0; i < node.body.params.length; i++) {
                if (i >= 1) {
                    data += ', ';
                }
                data += node.body.params[i];
            }
            data += '>';
        }
        data += ' = ';
        data += this.serializeExpression(expression);
        data += ';';
        return data;
    }
    serializeArrayExpression(node) {
        const shouldParenthesize = node.values.type === ast_1.NodeType.INFER_CLAUSE ||
            (node.values.type === ast_1.NodeType.UNION_EXPRESSION &&
                node.values.args.length >= 2);
        let data = '';
        if (shouldParenthesize) {
            data += '(';
        }
        data += this.serializeExpression(node.values);
        if (shouldParenthesize) {
            data += ')';
        }
        data += '[]';
        return data;
    }
    serializeExportStatement(node) {
        let data = '';
        data += 'export ';
        switch (node.argument.type) {
            case ast_1.NodeType.ALIAS_DECLARATION:
                data += this.serializeAliasDeclaration(node.argument);
                break;
            case ast_1.NodeType.INTERFACE_DECLARATION:
                data += this.serializeInterfaceDeclaration(node.argument);
                break;
            case ast_1.NodeType.RUNTIME_ENUM_DECLARATION:
                data += this.serializeRuntimeEnum(node.argument);
                break;
        }
        return data;
    }
    serializeExpression(node) {
        switch (node.type) {
            case ast_1.NodeType.ARRAY_EXPRESSION:
                return this.serializeArrayExpression(node);
            case ast_1.NodeType.EXTENDS_CLAUSE:
                return this.serializeExtendsClause(node);
            case ast_1.NodeType.GENERIC_EXPRESSION:
                return this.serializeGenericExpression(node);
            case ast_1.NodeType.IDENTIFIER:
                return this.serializeIdentifier(node);
            case ast_1.NodeType.INFER_CLAUSE:
                return this.serializeInferClause(node);
            case ast_1.NodeType.LITERAL:
                return this.serializeLiteral(node);
            case ast_1.NodeType.MAPPED_TYPE:
                return this.serializeMappedType(node);
            case ast_1.NodeType.OBJECT_EXPRESSION:
                return this.serializeObjectExpression(node);
            case ast_1.NodeType.UNION_EXPRESSION:
                return this.serializeUnionExpression(node);
        }
    }
    serializeExtendsClause(node) {
        let data = '';
        data += this.serializeExpression(node.checkType);
        data += ' extends ';
        data += this.serializeExpression(node.extendsType);
        data += '\n  ? ';
        data += this.serializeExpression(node.trueType);
        data += '\n  : ';
        data += this.serializeExpression(node.falseType);
        return data;
    }
    serializeGenericExpression(node) {
        let data = '';
        data += node.name;
        data += '<';
        for (let i = 0; i < node.args.length; i++) {
            if (i >= 1) {
                data += ', ';
            }
            data += this.serializeExpression(node.args[i]);
        }
        data += '>';
        return data;
    }
    serializeIdentifier(node) {
        return node.name;
    }
    serializeImportClause(node) {
        let data = '';
        data += node.name;
        if (node.alias) {
            data += ' as ';
            data += node.alias;
        }
        return data;
    }
    serializeImportStatement(node) {
        let data = '';
        let i = 0;
        data += 'import ';
        if (this.typeOnlyImports) {
            data += 'type ';
        }
        data += '{';
        for (const importClause of node.imports) {
            if (i >= 1) {
                data += ',';
            }
            data += ' ';
            data += this.serializeImportClause(importClause);
            i++;
        }
        data += ' } from ';
        data += JSON.stringify(node.moduleName);
        data += ';';
        return data;
    }
    serializeInferClause(node) {
        let data = '';
        data += 'infer ';
        data += node.name;
        return data;
    }
    serializeInterfaceDeclaration(node) {
        let data = '';
        data += 'interface ';
        data += node.name;
        data += ' ';
        data += this.serializeObjectExpression(node.body);
        return data;
    }
    serializeLiteral(node) {
        return JSON.stringify(node.value);
    }
    serializeKey(key) {
        return IDENTIFIER_REGEXP.test(key) ? key : JSON.stringify(key);
    }
    serializeMappedType(node) {
        let data = '';
        data += '{\n  [K in string]?: ';
        data += this.serializeExpression(node.value);
        data += ';\n}';
        return data;
    }
    serializeObjectExpression(node) {
        let data = '';
        data += '{';
        if (node.properties.length > 0) {
            data += '\n';
            const sortedProperties = [...node.properties].sort((a, b) => a.key.localeCompare(b.key));
            for (const property of sortedProperties) {
                data += '  ';
                data += this.serializeProperty(property);
            }
        }
        data += '}';
        return data;
    }
    serializeProperty(node) {
        let data = '';
        if (node.comment) {
            data += '/**\n';
            for (const line of node.comment.split(/\r?\n/)) {
                data += `   *${line ? ` ${line}` : ''}\n`;
            }
            data += '   */\n  ';
        }
        data += this.serializeKey(node.key);
        data += ': ';
        data += this.serializeExpression(node.value);
        data += ';\n';
        return data;
    }
    serializeRuntimeEnum(node) {
        let data = 'enum ';
        data += node.name;
        data += ' {\n';
        const args = node.body.type === ast_1.NodeType.UNION_EXPRESSION
            ? node.body.args
            : [node.body];
        args.sort((a, b) => {
            return a.value.localeCompare(b.value);
        });
        for (const arg of args) {
            if (arg.type === ast_1.NodeType.LITERAL && typeof arg.value === 'string') {
                const serializedArg = this.serializeLiteral(arg);
                const enumValueName = this.camelCase
                    ? (0, transformer_1.toCamelCase)(arg.value)
                    : arg.value;
                data += '  ';
                data += enumValueName;
                data += ' = ';
                data += serializedArg;
                data += ',';
                data += '\n';
            }
        }
        data += '}';
        return data;
    }
    serializeUnionExpression(node) {
        let data = '';
        let i = 0;
        const sortedArgs = [...node.args].sort((a, b) => {
            if (a.type !== ast_1.NodeType.IDENTIFIER || b.type !== ast_1.NodeType.IDENTIFIER) {
                return 0;
            }
            if (a.name === undefined || a.name === 'undefined')
                return 1;
            if (b.name === undefined || b.name === 'undefined')
                return -1;
            if (a.name === null || a.name === 'null')
                return 1;
            if (b.name === null || b.name === 'null')
                return -1;
            if (a.name < b.name)
                return -1;
            if (a.name > b.name)
                return 1;
            return 0;
        });
        for (const arg of sortedArgs) {
            if (i >= 1) {
                data += ' | ';
            }
            data += this.serializeExpression(arg);
            i++;
        }
        return data;
    }
}
exports.Serializer = Serializer;
//# sourceMappingURL=serializer.js.map