export type ColumnMetadataOptions = {
    comment?: string | null;
    dataType: string;
    dataTypeSchema?: string;
    enumValues?: string[] | null;
    hasDefaultValue?: boolean;
    isArray?: boolean;
    isAutoIncrementing?: boolean;
    isNullable?: boolean;
    name: string;
};
export declare class ColumnMetadata {
    readonly comment: string | null;
    readonly dataType: string;
    readonly dataTypeSchema: string | undefined;
    readonly enumValues: string[] | null;
    readonly hasDefaultValue: boolean;
    readonly isArray: boolean;
    readonly isAutoIncrementing: boolean;
    readonly isNullable: boolean;
    readonly name: string;
    constructor(options: ColumnMetadataOptions);
}
