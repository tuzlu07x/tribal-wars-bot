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
Object.defineProperty(exports, "__esModule", { value: true });
var LoginForm_1 = require("./Logic/LoginForm");
var MainScreen_1 = require("./Logic/MainScreen");
var puppeteerExtra = require('puppeteer-extra');
var Stealth = require('puppeteer-extra-plugin-stealth');
puppeteerExtra.use(Stealth());
function sleep(ms) {
    return new Promise(function (resolve) { return setTimeout(resolve, ms); });
}
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
            var browser, page, loginForm, mainScreen, _a, _b, _c, _d, _e, textSelector, fullTitle, error_1;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0: return [4 /*yield*/, puppeteerExtra.launch({
                            headless: false
                        })];
                    case 1:
                        browser = _f.sent();
                        return [4 /*yield*/, browser.newPage()];
                    case 2:
                        page = _f.sent();
                        return [4 /*yield*/, page.setViewport({ width: 1200, height: 720 })];
                    case 3:
                        _f.sent();
                        _f.label = 4;
                    case 4:
                        _f.trys.push([4, 11, , 12]);
                        loginForm = new LoginForm_1.default(this, this.url, browser, page);
                        return [4 /*yield*/, sleep(10000)];
                    case 5:
                        _f.sent();
                        loginForm.getRelatedFunc();
                        return [4 /*yield*/, sleep(10000)];
                    case 6:
                        _f.sent();
                        _a = MainScreen_1.default.bind;
                        _b = [void 0, this];
                        return [4 /*yield*/, loginForm.getCurrentPage()];
                    case 7:
                        mainScreen = new (_a.apply(MainScreen_1.default, _b.concat([_f.sent()])))();
                        mainScreen.getRelatedFunc(page);
                        sleep(5000);
                        _d = (_c = console).log;
                        _e = 'after sleep ';
                        return [4 /*yield*/, loginForm.getCurrentPage()];
                    case 8:
                        _d.apply(_c, [_e + (_f.sent())]);
                        return [4 /*yield*/, page.waitForSelector('text/Customize and automate')];
                    case 9:
                        textSelector = _f.sent();
                        return [4 /*yield*/, (textSelector === null || textSelector === void 0 ? void 0 : textSelector.evaluate(function (el) { return el.textContent; }))];
                    case 10:
                        fullTitle = _f.sent();
                        return [3 /*break*/, 12];
                    case 11:
                        error_1 = _f.sent();
                        console.log(error_1);
                        return [3 /*break*/, 12];
                    case 12: return [4 /*yield*/, browser.close()];
                    case 13:
                        _f.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Connection.prototype.getVillageId = function (url) {
        var urlParams = new URLSearchParams(url);
        var villageId = urlParams.get("village");
        return villageId;
    };
    return Connection;
}());
exports.default = Connection;
