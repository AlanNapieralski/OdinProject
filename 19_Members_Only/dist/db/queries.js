"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_js_1 = require("../db/database.js");
function createUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield database_js_1.db.insertInto('user')
            .values(user)
            .returningAll()
            .executeTakeFirstOrThrow();
    });
}
function deleteUser(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield database_js_1.db.deleteFrom('user').where('id', '=', id)
            .returningAll()
            .executeTakeFirstOrThrow();
    });
}
function getUserByUsername(username) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield database_js_1.db
            .selectFrom('user')
            .where('username', '=', username)
            .selectAll()
            .executeTakeFirst();
    });
}
function changeMembershipStatus(id, status) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield database_js_1.db
            .updateTable('user')
            .set({
            ismember: status,
        })
            .where('id', '=', id)
            .execute();
    });
}
exports.default = {
    createUser,
    deleteUser,
    getUserByUsername,
    changeMembershipStatus
};
//# sourceMappingURL=queries.js.map