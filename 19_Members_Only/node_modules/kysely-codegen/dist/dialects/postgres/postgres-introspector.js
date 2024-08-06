"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _PostgresIntrospector_instances, _PostgresIntrospector_options, _PostgresIntrospector_createDatabaseMetadata, _PostgresIntrospector_getRootType, _PostgresIntrospector_introspectEnums, _PostgresIntrospector_introspectDomains;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgresIntrospector = void 0;
const kysely_1 = require("kysely");
const core_1 = require("../../core");
const introspector_1 = require("../../introspector");
class PostgresIntrospector extends introspector_1.Introspector {
    constructor(adapter, options = { domains: true }) {
        super();
        _PostgresIntrospector_instances.add(this);
        _PostgresIntrospector_options.set(this, void 0);
        this.adapter = adapter;
        __classPrivateFieldSet(this, _PostgresIntrospector_options, options, "f");
    }
    async introspect(options) {
        const tables = await this.getTables(options);
        const [enums, domains] = await Promise.all([
            __classPrivateFieldGet(this, _PostgresIntrospector_instances, "m", _PostgresIntrospector_introspectEnums).call(this, options.db),
            __classPrivateFieldGet(this, _PostgresIntrospector_instances, "m", _PostgresIntrospector_introspectDomains).call(this, options.db),
        ]);
        return __classPrivateFieldGet(this, _PostgresIntrospector_instances, "m", _PostgresIntrospector_createDatabaseMetadata).call(this, tables, enums, domains);
    }
}
exports.PostgresIntrospector = PostgresIntrospector;
_PostgresIntrospector_options = new WeakMap(), _PostgresIntrospector_instances = new WeakSet(), _PostgresIntrospector_createDatabaseMetadata = function _PostgresIntrospector_createDatabaseMetadata(tables, enums, domains) {
    const tablesMetadata = tables.map((table) => ({
        ...table,
        columns: table.columns.map((column) => {
            const dataType = __classPrivateFieldGet(this, _PostgresIntrospector_instances, "m", _PostgresIntrospector_getRootType).call(this, column, domains);
            const isArray = dataType.startsWith('_');
            return {
                ...column,
                comment: column.comment ?? null,
                dataType: isArray ? dataType.slice(1) : dataType,
                dataTypeSchema: column.dataTypeSchema,
                enumValues: enums.get(`${column.dataTypeSchema ?? this.adapter.defaultSchema}.${dataType}`),
                isArray,
            };
        }),
    }));
    return new core_1.DatabaseMetadata(tablesMetadata, enums);
}, _PostgresIntrospector_getRootType = function _PostgresIntrospector_getRootType(column, domains) {
    const foundDomain = domains.find((d) => d.typeName === column.dataType &&
        d.typeSchema === column.dataTypeSchema);
    return foundDomain?.rootType ?? column.dataType;
}, _PostgresIntrospector_introspectEnums = async function _PostgresIntrospector_introspectEnums(db) {
    const enums = new core_1.EnumCollection();
    const rows = await db
        .withoutPlugins()
        .selectFrom('pg_type as type')
        .innerJoin('pg_enum as enum', 'type.oid', 'enum.enumtypid')
        .innerJoin('pg_catalog.pg_namespace as namespace', 'namespace.oid', 'type.typnamespace')
        .select([
        'namespace.nspname as schemaName',
        'type.typname as enumName',
        'enum.enumlabel as enumValue',
    ])
        .execute();
    for (const row of rows) {
        enums.add(`${row.schemaName}.${row.enumName}`, row.enumValue);
    }
    return enums;
}, _PostgresIntrospector_introspectDomains = async function _PostgresIntrospector_introspectDomains(db) {
    if (!__classPrivateFieldGet(this, _PostgresIntrospector_options, "f").domains) {
        return [];
    }
    const result = await (0, kysely_1.sql) `
      with recursive domain_hierarchy as (
        select oid, typbasetype
        from pg_type
        where typtype = 'd'
        and 'information_schema'::regnamespace::oid <> typnamespace

        union all

        select dh.oid, t.typbasetype
        from domain_hierarchy as dh
        join pg_type as t ON t.oid = dh.typbasetype
      )

      select
        t.typname as "typeName",
        t.typnamespace::regnamespace::text as "typeSchema",
        bt.typname as "rootType"
      from domain_hierarchy as dh
      join pg_type as t on dh.oid = t.oid
      join pg_type as bt on dh.typbasetype = bt.oid
      where bt.typbasetype = 0;
    `.execute(db);
    return result.rows;
};
//# sourceMappingURL=postgres-introspector.js.map