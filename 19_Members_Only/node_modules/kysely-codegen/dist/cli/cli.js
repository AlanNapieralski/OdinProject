"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _Cli_instances, _Cli_getLogLevel, _Cli_parseBoolean, _Cli_serializeFlags, _Cli_showHelp;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cli = void 0;
const minimist_1 = __importDefault(require("minimist"));
const core_1 = require("../core");
const generator_1 = require("../generator");
const constants_1 = require("./constants");
const flags_1 = require("./flags");
/**
 * Creates a kysely-codegen command-line interface.
 */
class Cli {
    constructor() {
        _Cli_instances.add(this);
    }
    async generate(options) {
        const camelCase = !!options.camelCase;
        const excludePattern = options.excludePattern;
        const includePattern = options.includePattern;
        const outFile = options.outFile;
        const print = !!options.print;
        const runtimeEnums = options.runtimeEnums;
        const schema = options.schema;
        const typeOnlyImports = options.typeOnlyImports;
        const logger = new core_1.Logger(options.logLevel);
        const connectionStringParser = new core_1.ConnectionStringParser();
        const { connectionString, inferredDialectName } = connectionStringParser.parse({
            connectionString: options.url ?? constants_1.DEFAULT_URL,
            dialectName: options.dialectName,
            envFile: options.envFile,
            logger,
        });
        if (options.dialectName) {
            logger.info(`Using dialect '${options.dialectName}'.`);
        }
        else {
            logger.info(`No dialect specified. Assuming '${inferredDialectName}'.`);
        }
        const dialectManager = new core_1.DialectManager({
            domains: !!options.domains,
        });
        const dialect = dialectManager.getDialect(options.dialectName ?? inferredDialectName);
        const db = await dialect.introspector.connect({
            connectionString,
            dialect,
        });
        const generator = new generator_1.Generator();
        await generator.generate({
            camelCase,
            db,
            dialect,
            excludePattern,
            includePattern,
            logger,
            outFile,
            print,
            runtimeEnums,
            schema,
            typeOnlyImports,
            verify: options.verify,
        });
        await db.destroy();
    }
    parseOptions(args, options) {
        const argv = (0, minimist_1.default)(args);
        const _ = argv._;
        const camelCase = __classPrivateFieldGet(this, _Cli_instances, "m", _Cli_parseBoolean).call(this, argv['camel-case']);
        const dialectName = argv.dialect;
        const domains = __classPrivateFieldGet(this, _Cli_instances, "m", _Cli_parseBoolean).call(this, argv.domains);
        const envFile = argv['env-file'];
        const excludePattern = argv['exclude-pattern'];
        const help = !!argv.h || !!argv.help || _.includes('-h') || _.includes('--help');
        const includePattern = argv['include-pattern'];
        const logLevel = __classPrivateFieldGet(this, _Cli_instances, "m", _Cli_getLogLevel).call(this, argv['log-level']);
        const outFile = argv['out-file'] ??
            (argv.print ? undefined : constants_1.DEFAULT_OUT_FILE);
        const print = __classPrivateFieldGet(this, _Cli_instances, "m", _Cli_parseBoolean).call(this, argv.print);
        const runtimeEnums = __classPrivateFieldGet(this, _Cli_instances, "m", _Cli_parseBoolean).call(this, argv['runtime-enums']);
        const schema = argv.schema;
        const typeOnlyImports = __classPrivateFieldGet(this, _Cli_instances, "m", _Cli_parseBoolean).call(this, argv['type-only-imports'] ?? true);
        const url = argv.url ?? constants_1.DEFAULT_URL;
        const verify = __classPrivateFieldGet(this, _Cli_instances, "m", _Cli_parseBoolean).call(this, argv.verify ?? false);
        try {
            for (const key in argv) {
                if (key !== '_' &&
                    !flags_1.FLAGS.some((flag) => {
                        return [
                            flag.shortName,
                            flag.longName,
                            ...(flag.longName.startsWith('no-')
                                ? [flag.longName.slice(3)]
                                : []),
                        ].includes(key);
                    })) {
                    throw new RangeError(`Invalid flag: "${key}"`);
                }
            }
            if (help && !options?.silent) {
                __classPrivateFieldGet(this, _Cli_instances, "m", _Cli_showHelp).call(this);
            }
            if (dialectName && !constants_1.VALID_DIALECTS.includes(dialectName)) {
                const dialectValues = constants_1.VALID_DIALECTS.join(', ');
                throw new RangeError(`Parameter '--dialect' must have one of the following values: ${dialectValues}`);
            }
            if (!url) {
                throw new TypeError("Parameter '--url' must be a valid connection string. Examples:\n\n" +
                    '  --url=postgres://username:password@mydomain.com/database\n' +
                    '  --url=env(DATABASE_URL)');
            }
        }
        catch (error) {
            if (logLevel > core_1.LogLevel.SILENT) {
                if (error instanceof Error) {
                    console.error(new core_1.Logger().serializeError(error.message));
                    if (logLevel >= core_1.LogLevel.DEBUG) {
                        console.error();
                        throw error;
                    }
                    else {
                        process.exit(0);
                    }
                }
                else {
                    throw error;
                }
            }
        }
        return {
            camelCase,
            dialectName,
            domains,
            envFile,
            excludePattern,
            includePattern,
            logLevel,
            outFile,
            print,
            runtimeEnums,
            schema,
            typeOnlyImports,
            url,
            verify,
        };
    }
    async run(argv) {
        const options = this.parseOptions(argv);
        await this.generate(options);
    }
}
exports.Cli = Cli;
_Cli_instances = new WeakSet(), _Cli_getLogLevel = function _Cli_getLogLevel(name) {
    switch (name) {
        case 'silent':
            return core_1.LogLevel.SILENT;
        case 'info':
            return core_1.LogLevel.INFO;
        case 'error':
            return core_1.LogLevel.ERROR;
        case 'debug':
            return core_1.LogLevel.DEBUG;
        case 'warn':
            return core_1.LogLevel.WARN;
        default:
            return constants_1.DEFAULT_LOG_LEVEL;
    }
}, _Cli_parseBoolean = function _Cli_parseBoolean(input) {
    return !!input && input !== 'false';
}, _Cli_serializeFlags = function _Cli_serializeFlags() {
    const lines = [];
    let maxLineLength = 0;
    for (const { description, longName, shortName } of flags_1.FLAGS) {
        let line = `  --${longName}`;
        if (shortName) {
            line += `, -${shortName}`;
        }
        if (line.length > maxLineLength) {
            maxLineLength = line.length;
        }
        lines.push({ description, line });
    }
    return lines.map(({ description, line }) => {
        const padding = ' '.repeat(maxLineLength - line.length + 2);
        return `${line}${padding}${description}`;
    });
}, _Cli_showHelp = function _Cli_showHelp() {
    const flagLines = __classPrivateFieldGet(this, _Cli_instances, "m", _Cli_serializeFlags).call(this);
    const lines = ['', 'kysely-codegen [options]', '', ...flagLines, ''];
    console.info(lines.join('\n'));
    process.exit(0);
};
//# sourceMappingURL=cli.js.map