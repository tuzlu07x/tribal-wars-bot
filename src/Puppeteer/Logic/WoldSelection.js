"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var BaseLogic_1 = require("../BaseLogic");
var scrapeIt = require("scrape-it");
var WorldSelection = /** @class */ (function (_super) {
    __extends(WorldSelection, _super);
    function WorldSelection(connection, browser) {
        var _this = _super.call(this, connection) || this;
        _this.browser = browser;
        return _this;
    }
    WorldSelection.prototype.getRelatedFunc = function (page) {
        return __awaiter(this, void 0, void 0, function () {
            var worlds, _i, _a, item, newPage, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.getScrape(page)];
                    case 1:
                        worlds = _b.sent();
                        console.log(worlds);
                        _i = 0, _a = worlds.worlds;
                        _b.label = 2;
                    case 2:
                        if (!(_i < _a.length)) return [3 /*break*/, 9];
                        item = _a[_i];
                        _b.label = 3;
                    case 3:
                        _b.trys.push([3, 7, , 8]);
                        return [4 /*yield*/, this.browser.newPage()];
                    case 4:
                        newPage = _b.sent();
                        return [4 /*yield*/, newPage.goto('https://www.klanlar.org' + item['url'], { waitUntil: 'load', timeout: 5000 })];
                    case 5:
                        _b.sent();
                        return [4 /*yield*/, page.waitForSelector('.world_button_active').then(function () { return console.log('it should never happened'); })];
                    case 6:
                        _b.sent();
                        return [3 /*break*/, 8];
                    case 7:
                        error_1 = _b.sent();
                        console.error("Error navigating to ".concat(item['url'], ": ").concat(error_1.message));
                        return [3 /*break*/, 8];
                    case 8:
                        _i++;
                        return [3 /*break*/, 2];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    WorldSelection.prototype.worldListHtml = function (page) {
        return __awaiter(this, void 0, void 0, function () {
            var text;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, page.waitForSelector('.worlds-container')];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, page.$eval('.worlds-container', function (e) { return e.innerHTML; })];
                    case 2:
                        text = _a.sent();
                        return [2 /*return*/, text];
                }
            });
        });
    };
    WorldSelection.prototype.getScrape = function (page) {
        return __awaiter(this, void 0, void 0, function () {
            var htmlContent, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.worldListHtml(page)];
                    case 1:
                        htmlContent = _a.sent();
                        data = scrapeIt.scrapeHTML(htmlContent, {
                            worlds: {
                                listItem: ".world-select",
                                data: {
                                    title: "a span",
                                    url: {
                                        attr: "href"
                                    }
                                }
                            },
                        });
                        return [2 /*return*/, data];
                }
            });
        });
    };
    return WorldSelection;
}(BaseLogic_1.default));
exports.default = WorldSelection;
