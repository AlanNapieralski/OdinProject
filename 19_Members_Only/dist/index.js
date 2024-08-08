"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authenticationController_js_1 = require("./controllers/authenticationController.js");
const path_1 = __importDefault(require("path"));
const queries_js_1 = __importDefault(require("./db/queries.js"));
//auth
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("passport"));
const PORT = 3000;
const app = (0, express_1.default)();
// basic setup
app.set("views", path_1.default.join(__dirname, "src", "views"));
app.set("view engine", "ejs");
app.use(express_1.default.static("public"));
//auth
app.use((0, express_session_1.default)({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use(express_1.default.urlencoded({ extended: true }));
// routing
app.get('/', (req, res) => {
    if (!req.user) {
        return res.redirect('log-in');
    }
    return res.render("dashboard", { user: req.user });
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
        }
        return res.render('dashboard', { user: req.user });
    }
    return res.redirect('/dashboard');
});
app.get('/log-in', (req, res) => {
    if (req.user)
        return res.redirect('/dashboard');
    return res.render('log-in');
});
app.post('/log-in', authenticationController_js_1.postLogin);
app.get('/sign-in', (req, res) => {
    if (req.user)
        return res.redirect('/dashboard');
    return res.render('sign-in', {});
});
app.post('/sign-in', ...authenticationController_js_1.signInPost);
// errors
app.use('/', (err, req, res, next) => {
    console.error(err);
    res.status(400).send("Whoops, error!");
});
app.listen(PORT, () => console.log(`Listening on the port: ${PORT}...`));
//# sourceMappingURL=index.js.map