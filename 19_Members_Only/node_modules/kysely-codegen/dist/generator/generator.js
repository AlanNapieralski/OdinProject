"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Generator = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const perf_hooks_1 = require("perf_hooks");
const core_1 = require("../core");
const serializer_1 = require("../serializer");
const transformer_1 = require("../transformer");
/**
 * Generates codegen output using specified options.
 */
class Generator {
    async generate(options) {
        const startTime = perf_hooks_1.performance.now();
        options.logger?.info('Introspecting database...');
        const metadata = await options.dialect.introspector.introspect({
            db: options.db,
            excludePattern: options.excludePattern,
            includePattern: options.includePattern,
        });
        options.logger?.debug();
        options.logger?.debug(`Found ${metadata.tables.length} public tables:`);
        for (const table of metadata.tables) {
            options.logger?.debug(` - ${table.name}`);
        }
        options.logger?.debug();
        const transformer = options.transformer ?? new transformer_1.Transformer();
        const nodes = transformer.transform({
            camelCase: !!options.camelCase,
            defaultSchema: options.schema,
            dialect: options.dialect,
            metadata,
            runtimeEnums: !!options.runtimeEnums,
        });
        const serializer = options.serializer ??
            new serializer_1.Serializer({
                camelCase: !!options.camelCase,
                typeOnlyImports: options.typeOnlyImports,
            });
        const data = serializer.serialize(nodes);
        const relativeOutDir = options.outFile
            ? `.${path_1.sep}${(0, path_1.relative)(process.cwd(), options.outFile)}`
            : null;
        if (options.print) {
            console.log();
            console.log(data);
        }
        else if (relativeOutDir) {
            if (options.verify) {
                let existingTypes;
                try {
                    existingTypes = await fs_1.promises.readFile(relativeOutDir, 'utf8');
                }
                catch (error) {
                    options.logger?.error(error);
                    throw new Error('Failed to load existing types');
                }
                const diffChecker = new core_1.DiffChecker();
                const diff = diffChecker.diff(data, existingTypes);
                if (diff) {
                    options.logger?.error(diff);
                    throw new Error("Generated types are not up-to-date! Use '--log-level=error' option to view the diff.");
                }
                const endTime = perf_hooks_1.performance.now();
                const duration = Math.round(endTime - startTime);
                options.logger?.success(`Generated types are up-to-date! (${duration}ms)`);
            }
            else {
                const outDir = (0, path_1.parse)(relativeOutDir).dir;
                await fs_1.promises.mkdir(outDir, { recursive: true });
                await fs_1.promises.writeFile(relativeOutDir, data);
                const endTime = perf_hooks_1.performance.now();
                const duration = Math.round(endTime - startTime);
                const tableCount = metadata.tables.length;
                const s = tableCount === 1 ? '' : 's';
                options.logger?.success(`Introspected ${tableCount} table${s} and generated ${relativeOutDir} in ${duration}ms.\n`);
            }
        }
        return data;
    }
}
exports.Generator = Generator;
//# sourceMappingURL=generator.js.map