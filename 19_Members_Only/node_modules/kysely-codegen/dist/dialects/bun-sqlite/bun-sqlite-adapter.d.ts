import { IdentifierNode } from '../../ast';
import { Adapter } from '../../core';
export declare class BunSqliteAdapter extends Adapter {
    readonly defaultScalar: IdentifierNode;
    readonly scalars: {
        any: IdentifierNode;
        blob: IdentifierNode;
        boolean: IdentifierNode;
        integer: IdentifierNode;
        numeric: IdentifierNode;
        real: IdentifierNode;
        text: IdentifierNode;
    };
}
