"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MssqlAdapter = void 0;
const ast_1 = require("../../ast");
const core_1 = require("../../core");
class MssqlAdapter extends core_1.Adapter {
    constructor() {
        super(...arguments);
        // https://github.com/tediousjs/tedious/tree/master/src/data-types
        this.scalars = {
            bigint: new ast_1.IdentifierNode('number'),
            binary: new ast_1.IdentifierNode('Buffer'),
            bit: new ast_1.IdentifierNode('boolean'),
            char: new ast_1.IdentifierNode('string'),
            date: new ast_1.IdentifierNode('Date'),
            datetime: new ast_1.IdentifierNode('Date'),
            datetime2: new ast_1.IdentifierNode('Date'),
            datetimeoffset: new ast_1.IdentifierNode('Date'),
            decimal: new ast_1.IdentifierNode('number'),
            double: new ast_1.IdentifierNode('number'),
            float: new ast_1.IdentifierNode('number'),
            image: new ast_1.IdentifierNode('Buffer'),
            int: new ast_1.IdentifierNode('number'),
            money: new ast_1.IdentifierNode('number'),
            nchar: new ast_1.IdentifierNode('string'),
            ntext: new ast_1.IdentifierNode('string'),
            number: new ast_1.IdentifierNode('number'),
            numeric: new ast_1.IdentifierNode('number'),
            nvarchar: new ast_1.IdentifierNode('string'),
            real: new ast_1.IdentifierNode('number'),
            smalldatetime: new ast_1.IdentifierNode('Date'),
            smallint: new ast_1.IdentifierNode('number'),
            smallmoney: new ast_1.IdentifierNode('number'),
            text: new ast_1.IdentifierNode('string'),
            time: new ast_1.IdentifierNode('Date'),
            tinyint: new ast_1.IdentifierNode('number'),
            tvp: new ast_1.IdentifierNode('unknown'),
            uniqueidentifier: new ast_1.IdentifierNode('string'),
            varbinary: new ast_1.IdentifierNode('Buffer'),
            varchar: new ast_1.IdentifierNode('string'),
        };
    }
}
exports.MssqlAdapter = MssqlAdapter;
//# sourceMappingURL=mssql-adapter.js.map