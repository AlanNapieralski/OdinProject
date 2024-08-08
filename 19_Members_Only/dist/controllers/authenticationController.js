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
exports.signInPost = exports.postLogin = void 0;
const queries_js_1 = __importDefault(require("../db/queries.js"));
// auth
const authentication_js_1 = require("./authentication.js");
// validation
const express_validator_1 = require("express-validator");
const alphaErr = 'must only contain letters.';
const alphaNumErr = 'must only contain letters and/or numbers';
const lengthErr = 'must be between 1 and 20 characters.';
const validateUser = [
    (0, express_validator_1.body)("first_name").trim()
        .isAlpha().withMessage(`First name ${alphaErr}`)
        .isLength({ min: 1, max: 20 }).withMessage(`First name ${lengthErr}`)
        .notEmpty(),
    (0, express_validator_1.body)("last_name").trim()
        .isAlpha().withMessage(`Last name ${alphaErr}`)
        .isLength({ min: 1, max: 20 }).withMessage(`Last name ${lengthErr}`),
    (0, express_validator_1.body)("username").trim()
        .isAlphanumeric().withMessage(`Username ${alphaNumErr}`)
        .isLength({ min: 1, max: 20 }).withMessage(`Last name ${lengthErr}`)
        .notEmpty(),
];
const postLogin = (req, res, next) => {
    (0, authentication_js_1.login)('log-in', req, res, next);
};
exports.postLogin = postLogin;
exports.signInPost = [
    validateUser,
    (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            console.log(errors.array());
            return res.status(400).render("sign-in", {
                errors: errors.array(),
            });
        }
        const { first_name, last_name, username } = req.body;
        try {
            yield queries_js_1.default.createUser({
                first_name: first_name,
                last_name: last_name,
                username: username,
                password: req.body.password,
                ismember: false
            });
            return (0, authentication_js_1.login)('sign-in', req, res, next);
        }
        catch (err) {
            console.error('Error: User creation have failed');
            return next(err);
        }
    })
];
//# sourceMappingURL=authenticationController.js.map