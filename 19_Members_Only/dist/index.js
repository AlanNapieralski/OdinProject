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
const express_1 = __importDefault(require("express"));
const authenticationController_js_1 = require("./controllers/authenticationController.js");
const path_1 = __importDefault(require("path"));
const database_js_1 = require("./db/database.js");
const queries_js_1 = __importDefault(require("./db/queries.js"));
// types
//auth
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const PORT = 3000;
const app = (0, express_1.default)();
// basic setup
app.set("views", path_1.default.join(__dirname, "src", "views"));
app.set("view engine", "ejs");
app.use(express_1.default.static("public"));
// auth
app.use((0, express_session_1.default)({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(passport_1.default.session());
app.use(express_1.default.urlencoded({ extended: false }));
passport_1.default.use(new passport_local_1.Strategy((username, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('just checking: ' + username);
    try {
        console.log('Fetching the user info from the db');
        const user = yield queries_js_1.default.getUserByUsername(username);
        if (user === undefined) {
            console.error('the user with this username does not exist in the database');
            return done(null, false, { message: "No result from the query" });
        }
        console.log('Validating the user username');
        if (!user) {
            return done(null, false, { message: "Incorrect username" });
        }
        console.log('Validating the user password');
        if (user.password !== password) {
            return done(null, false, { message: "Incorrect password" });
        }
        console.log('all good');
        return done(null, user);
    }
    catch (err) {
        return done(err);
    }
})));
passport_1.default.serializeUser(function (user, done) {
    console.log('serializing the user');
    return done(null, user.id);
});
passport_1.default.deserializeUser((id, done) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('deserializing the user');
    if (typeof id !== 'number') {
        return done(new Error('Invalid ID type'));
    }
    try {
        const user = yield database_js_1.db
            .selectFrom('user')
            .where('user.id', '=', id)
            .selectAll()
            .executeTakeFirst();
        if (user === undefined) {
            console.error('the user with this id does not exist in the database');
            return done(null, false);
        }
        return done(null, user);
    }
    catch (err) {
        console.error("Error: Failed deserialisation of the user");
        return done(err);
    }
}));
// routing
app.get('/', (req, res) => {
    if (!req.user) {
        return res.redirect('sign-in');
    }
    res.render("dashboard", { user: req.user });
});
app.get('/dashboard', (req, res) => {
    if (req.user) {
        return res.render("dashboard", { user: req.user });
    }
    res.redirect("/log-in");
});
app.post("/dashboard", (req, res) => {
    if (req.body.action === 'request_membership') {
        if (req.user) {
            req.user.ismember = true;
            queries_js_1.default.changeMembershipStatus(req.user.id, true);
            console.log('User have become a member');
        }
        return res.render('dashboard', { user: req.user });
    }
    return res.redirect('/dashboard');
});
app.get('/log-in', (req, res) => {
    if (req.user)
        res.redirect('/dashboard');
    res.render('log-in', {});
});
app.post('/log-in', passport_1.default.authenticate('local', { failureRedirect: '/log-in', successRedirect: '/dashboard' }));
app.get('/sign-in', (req, res) => {
    if (req.user)
        res.redirect('/dashboard');
    res.render('sign-in', {});
});
app.post('/sign-in', authenticationController_js_1.postSignin);
app.use('/', (err, req, res, next) => {
    console.error(err);
    res.status(400).send("Whoops, error!");
});
app.listen(PORT, () => console.log(`Listening on the port: ${PORT}...`));
//# sourceMappingURL=index.js.map