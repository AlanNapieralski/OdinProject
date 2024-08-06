"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.migrate = exports.addExtraColumn = void 0;
const kysely_1 = require("kysely");
const dialects_1 = require("../../dialects");
const down = async (db, dialect) => {
    await db.transaction().execute(async (trx) => {
        await trx.schema.dropTable('boolean').ifExists().execute();
        await trx.schema.dropTable('foo_bar').ifExists().execute();
        if (dialect instanceof dialects_1.PostgresDialect) {
            await trx.schema
                .withSchema('test')
                .dropType('status')
                .ifExists()
                .execute();
            await trx.schema
                .withSchema('test')
                .dropType('is_bool')
                .ifExists()
                .execute();
            await trx.schema.dropSchema('test').ifExists().execute();
            await trx.schema.dropType('status').ifExists().execute();
            await trx.schema.dropType('pos_int_child').ifExists().execute();
            await trx.schema.dropType('pos_int').ifExists().execute();
        }
    });
};
const up = async (db, dialect) => {
    await db.transaction().execute(async (trx) => {
        if (dialect instanceof dialects_1.PostgresDialect) {
            await trx.schema.createSchema('test').ifNotExists().execute();
            await trx.schema
                .withSchema('test')
                .createType('status')
                .asEnum(['FOO', 'BAR'])
                .execute();
            await trx.schema
                .createType('status')
                .asEnum(['CONFIRMED', 'UNCONFIRMED'])
                .execute();
            await (0, kysely_1.sql) `CREATE domain pos_int AS Integer CONSTRAINT positive_number CHECK (value >= 0);`.execute(trx);
            // Edge case where a domain is a child of another domain
            await (0, kysely_1.sql) `CREATE domain pos_int_child as pos_int;`.execute(trx);
            await (0, kysely_1.sql) `CREATE domain test.is_bool as boolean;`.execute(trx);
        }
        let builder = trx.schema
            .createTable('foo_bar')
            .addColumn('false', 'boolean', (col) => col.notNull())
            .addColumn('true', 'boolean', (col) => col.notNull());
        if (dialect instanceof dialects_1.MysqlDialect) {
            builder = builder
                .addColumn('id', 'serial')
                .addColumn('user_status', (0, kysely_1.sql) `enum('CONFIRMED','UNCONFIRMED')`);
        }
        else if (dialect instanceof dialects_1.PostgresDialect) {
            builder = builder
                .addColumn('id', 'serial')
                .addColumn('user_status', (0, kysely_1.sql) `status`)
                .addColumn('user_status_2', (0, kysely_1.sql) `test.status`)
                .addColumn('array', (0, kysely_1.sql) `text[]`)
                .addColumn('nullable_pos_int', (0, kysely_1.sql) `pos_int`)
                .addColumn('defaulted_nullable_pos_int', (0, kysely_1.sql) `pos_int`, (col) => col.defaultTo(0))
                .addColumn('defaulted_required_pos_int', (0, kysely_1.sql) `pos_int`, (col) => col.notNull().defaultTo(0))
                .addColumn('child_domain', (0, kysely_1.sql) `pos_int_child`)
                .addColumn('test_domain_is_bool', (0, kysely_1.sql) `test.is_bool`)
                .addColumn('timestamps', (0, kysely_1.sql) `timestamp with time zone[]`);
        }
        else {
            builder = builder
                .addColumn('id', 'integer', (col) => col.autoIncrement().notNull().primaryKey())
                .addColumn('user_status', 'text');
        }
        await builder.execute();
        if (dialect instanceof dialects_1.PostgresDialect) {
            await trx.executeQuery((0, kysely_1.sql) `
          comment on column foo_bar.false is
          'This is a comment on a column.\r\n\r\nIt''s nice, isn''t it?';
        `.compile(trx));
        }
    });
};
const addExtraColumn = async (db) => {
    await db.transaction().execute(async (trx) => {
        const builder = trx.schema
            .alterTable('foo_bar')
            .addColumn('user_name', 'varchar(50)', (col) => col.defaultTo('test'));
        await builder.execute();
    });
};
exports.addExtraColumn = addExtraColumn;
const migrate = async (dialect, connectionString) => {
    const db = new kysely_1.Kysely({
        dialect: await dialect.createKyselyDialect({ connectionString }),
        plugins: [new kysely_1.CamelCasePlugin()],
    });
    await down(db, dialect);
    await up(db, dialect);
    return db;
};
exports.migrate = migrate;
//# sourceMappingURL=migrate.js.map