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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postSignin = exports.postLogin = void 0;
const queries_js_1 = __importDefault(require("../db/queries.js"));
const passport_1 = __importDefault(require("passport"));
const postLogin = (req, res, next) => {
    login();
};
exports.postLogin = postLogin;
const postSignin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield queries_js_1.default.createUser({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            username: req.body.username,
            password: req.body.password,
            ismember: false
        });
        login();
    }
    catch (err) {
        console.error('Error: User creation have failed');
        return next(err);
    }
});
exports.postSignin = postSignin;
function login() {
    passport_1.default.authenticate('local', { failureRedirect: '/log-in', successRedirect: '/dashboard' });
}
//# sourceMappingURL=authenticationController.js.map