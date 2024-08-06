"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.xit = exports.it = exports.describe = void 0;
const core_1 = require("./core");
let depth = 0;
let passed = 0;
let skipped = 0;
let total = 0;
const describe = async (name, test) => {
    const logger = new core_1.Logger();
    if (!depth) {
        logger.info('Running tests...');
    }
    depth++;
    await test();
    depth--;
    if (!depth) {
        logger.success(`${passed}/${total} test${total === 1 ? '' : 's'} passed`);
        total = 0;
        if (skipped) {
            logger.info(`${skipped} test${skipped === 1 ? '' : 's'} skipped`);
            skipped = 0;
        }
        logger.log('');
    }
};
exports.describe = describe;
const it = async (name, test) => {
    depth++;
    passed++;
    total++;
    await test();
    depth--;
};
exports.it = it;
const xit = (_name, _test) => {
    skipped++;
};
exports.xit = xit;
//# sourceMappingURL=test.utils.js.map