var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var puppeteerExtra = require('puppeteer-extra');
var Stealth = require('puppeteer-extra-plugin-stealth');
var fs = require('fs').promises;
puppeteerExtra.use(Stealth());
var Connection = /** @class */ (function () {
    function Connection(url, userType, userName, passwordType, password) {
        this.url = url;
        this.userType = userType;
        this.userName = userName;
        this.passwordType = passwordType;
        this.password = password;
    }
    Connection.prototype.connector = function () {
        return __awaiter(this, void 0, void 0, function () {
            var browser, page, error_1, textSelector, fullTitle;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, puppeteerExtra.launch({
                            headless: false,
                        })];
                    case 1:
                        browser = _a.sent();
                        return [4 /*yield*/, browser.newPage()];
                    case 2:
                        page = _a.sent();
                        return [4 /*yield*/, page.setViewport({ width: 1200, height: 720 })];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, page.goto(this.url, { waitUntil: 'networkidle0' })];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, this.session(page)];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6:
                        _a.trys.push([6, 8, , 13]);
                        return [4 /*yield*/, this.readFile(page)];
                    case 7:
                        _a.sent();
                        return [3 /*break*/, 13];
                    case 8:
                        error_1 = _a.sent();
                        console.log('Session could not be loaded. Logging in...');
                        return [4 /*yield*/, this.inputUserCredentials(page)];
                    case 9:
                        _a.sent();
                        return [4 /*yield*/, this.clickLoginButton(page)];
                    case 10:
                        _a.sent();
                        return [4 /*yield*/, page.waitForNavigation({ waitUntil: 'networkidle0', timeout: 5000 })];
                    case 11:
                        _a.sent();
                        // Save the session for future use
                        return [4 /*yield*/, this.session(page)];
                    case 12:
                        // Save the session for future use
                        _a.sent();
                        return [3 /*break*/, 13];
                    case 13: return [4 /*yield*/, page.waitForSelector('.world_button_active')];
                    case 14:
                        _a.sent();
                        return [4 /*yield*/, page.click('.world_button_active')];
                    case 15:
                        _a.sent();
                        return [4 /*yield*/, page.waitForNavigation({ waitUntil: 'networkidle0' })];
                    case 16:
                        _a.sent();
                        return [4 /*yield*/, page.waitForSelector('text/Customize and automate')];
                    case 17:
                        textSelector = _a.sent();
                        return [4 /*yield*/, (textSelector === null || textSelector === void 0 ? void 0 : textSelector.evaluate(function (el) { return el.textContent; }))];
                    case 18:
                        fullTitle = _a.sent();
                        console.log('The title of this blog post is "%s".', fullTitle);
                        return [4 /*yield*/, browser.close()];
                    case 19:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Connection.prototype.session = function (page) {
        return __awaiter(this, void 0, void 0, function () {
            var cookies, _a, _b, sessionStorage, localStorage;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = (_a = JSON).stringify;
                        return [4 /*yield*/, page.cookies()];
                    case 1:
                        cookies = _b.apply(_a, [_c.sent()]);
                        return [4 /*yield*/, page.evaluate(function () { return JSON.stringify(sessionStorage); })];
                    case 2:
                        sessionStorage = _c.sent();
                        return [4 /*yield*/, page.evaluate(function () { return JSON.stringify(localStorage); })];
                    case 3:
                        localStorage = _c.sent();
                        return [4 /*yield*/, fs.writeFile("./cookies.json", cookies)];
                    case 4:
                        _c.sent();
                        return [4 /*yield*/, fs.writeFile("./sessionStorage.json", sessionStorage)];
                    case 5:
                        _c.sent();
                        return [4 /*yield*/, fs.writeFile("./localStorage.json", localStorage)];
                    case 6:
                        _c.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ;
    Connection.prototype.readFile = function (page) {
        return __awaiter(this, void 0, void 0, function () {
            var cookiesString, cookies;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fs.readFile('./cookies.json', 'utf-8')];
                    case 1:
                        cookiesString = _a.sent();
                        cookies = JSON.parse(cookiesString);
                        return [4 /*yield*/, page.setCookie.apply(page, cookies)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Connection.prototype.inputUserCredentials = function (page) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, page.waitForSelector("input[name='".concat(this.userType, "']"))];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, page.type("input[name='".concat(this.userType, "']"), this.userName)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, page.waitForSelector("input[name='".concat(this.passwordType, "']"))];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, page.type("input[name='".concat(this.passwordType, "']"), this.password)];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Connection.prototype.clickLoginButton = function (page) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, page.waitForSelector('.btn-login')];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, page.click('.btn-login')];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return Connection;
}());
var connection = new Connection('https://www.klanlar.org/', 'username', 'lordFatih', 'password', '1234567890');
connection.connector();
