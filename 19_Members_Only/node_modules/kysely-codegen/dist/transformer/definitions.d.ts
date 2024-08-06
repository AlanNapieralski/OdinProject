import type { DefinitionNode } from '../ast';
import { TemplateNode } from '../ast';
export declare const GLOBAL_DEFINITIONS: {
    /**
     * @see https://github.com/RobinBlomberg/kysely-codegen/issues/135
     */
    ArrayType: TemplateNode;
    /**
     * @see https://github.com/RobinBlomberg/kysely-codegen/issues/135
     */
    ArrayTypeImpl: TemplateNode;
    Generated: TemplateNode;
};
export declare const JSON_ARRAY_DEFINITION: DefinitionNode;
export declare const JSON_OBJECT_DEFINITION: DefinitionNode;
export declare const JSON_PRIMITIVE_DEFINITION: DefinitionNode;
export declare const JSON_VALUE_DEFINITION: DefinitionNode;
export declare const JSON_DEFINITION: DefinitionNode;
