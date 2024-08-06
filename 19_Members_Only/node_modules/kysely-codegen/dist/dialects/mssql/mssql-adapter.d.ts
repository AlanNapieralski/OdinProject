import { IdentifierNode } from '../../ast';
import { Adapter } from '../../core';
export declare class MssqlAdapter extends Adapter {
    readonly scalars: {
        bigint: IdentifierNode;
        binary: IdentifierNode;
        bit: IdentifierNode;
        char: IdentifierNode;
        date: IdentifierNode;
        datetime: IdentifierNode;
        datetime2: IdentifierNode;
        datetimeoffset: IdentifierNode;
        decimal: IdentifierNode;
        double: IdentifierNode;
        float: IdentifierNode;
        image: IdentifierNode;
        int: IdentifierNode;
        money: IdentifierNode;
        nchar: IdentifierNode;
        ntext: IdentifierNode;
        number: IdentifierNode;
        numeric: IdentifierNode;
        nvarchar: IdentifierNode;
        real: IdentifierNode;
        smalldatetime: IdentifierNode;
        smallint: IdentifierNode;
        smallmoney: IdentifierNode;
        text: IdentifierNode;
        time: IdentifierNode;
        tinyint: IdentifierNode;
        tvp: IdentifierNode;
        uniqueidentifier: IdentifierNode;
        varbinary: IdentifierNode;
        varchar: IdentifierNode;
    };
}
