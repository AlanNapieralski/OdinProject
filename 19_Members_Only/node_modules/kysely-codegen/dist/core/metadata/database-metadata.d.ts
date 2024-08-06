import type { EnumCollection } from '../enum-collection';
import type { TableMetadataOptions } from './table-metadata';
import { TableMetadata } from './table-metadata';
export declare class DatabaseMetadata {
    readonly enums: EnumCollection;
    readonly tables: TableMetadata[];
    constructor(tables: TableMetadataOptions[], enums: EnumCollection);
}
