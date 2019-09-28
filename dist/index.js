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
        while (_) try {
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
var terminal_kit_1 = require("terminal-kit");
var puppeteer_1 = require("puppeteer");
var key_handler_1 = require("./key_handler");
var Main = /** @class */ (function () {
    function Main() {
        this._line = 5;
        this._keyHandler = new key_handler_1.KeyHandler();
        terminal_kit_1.terminal.grabInput({});
        // term.grabInput({mouse: 'button'});
        terminal_kit_1.terminal.on('key', this._keyHandler.handle_key);
        // term.on('mouse', this._keyHandler.handle_mouse);
    }
    Main.prototype.test_header = function () {
        terminal_kit_1.terminal.clear();
        var buff = Buffer.from([27, 91, 51, 74]);
        process.stdout.write(buff.toString());
        terminal_kit_1.terminal.black.bgWhite('black');
        terminal_kit_1.terminal.red(' red ');
        terminal_kit_1.terminal.green('green ');
        terminal_kit_1.terminal.yellow('yellow ');
        terminal_kit_1.terminal.blue.bgWhite('blue');
        terminal_kit_1.terminal.magenta(' magenta ');
        terminal_kit_1.terminal.cyan('cyan ');
        terminal_kit_1.terminal.white('white ');
        terminal_kit_1.terminal.brightBlack.bgWhite('bright black');
        terminal_kit_1.terminal.brightRed(' bright red ');
        terminal_kit_1.terminal.brightGreen('bright green ');
        terminal_kit_1.terminal.brightYellow('bright yellow ');
        terminal_kit_1.terminal.brightBlue('bright blue ');
        terminal_kit_1.terminal.brightMagenta('bright magenta ');
        terminal_kit_1.terminal.brightCyan('bright cyan ');
        terminal_kit_1.terminal.brightWhite('bright white\n');
        terminal_kit_1.terminal.bold('The terminal size is %dx%d\n', terminal_kit_1.terminal.width, terminal_kit_1.terminal.height);
    };
    Main.prototype.ssr = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            var browser, page, frame, handles, children_length, bodyHandle, i, itemName;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, puppeteer_1.launch({ headless: true })];
                    case 1:
                        browser = _a.sent();
                        this._line = 5;
                        return [4 /*yield*/, browser.newPage()];
                    case 2:
                        page = _a.sent();
                        page.on('domcontentloaded', function (event) {
                            _this._output('dom content loaded');
                        });
                        page.on('error', function (error) {
                            _this._output('error: ' + error.message);
                        });
                        page.on('frameattached', function (frame) {
                            _this._output('frameattached');
                        });
                        page.on('load', function (event) {
                            _this._output('load');
                        });
                        return [4 /*yield*/, page.goto(url, { waitUntil: 'networkidle0' })];
                    case 3:
                        _a.sent();
                        this._output('network idle. frames: ' + page.frames().length);
                        frame = page.mainFrame();
                        this._output('frame name: ' + frame.name());
                        this._output('childFrames: ' + frame.childFrames().length);
                        return [4 /*yield*/, frame.$$('p')];
                    case 4:
                        handles = _a.sent();
                        this._output('paragraphs: ' + handles.length);
                        return [4 /*yield*/, frame.$eval('body', function (element) {
                                return element.children.length;
                            })];
                    case 5:
                        children_length = _a.sent();
                        this._output('children of body: ' + children_length);
                        return [4 /*yield*/, frame.$('body')];
                    case 6:
                        bodyHandle = _a.sent();
                        if (!(bodyHandle != null)) return [3 /*break*/, 10];
                        i = 0;
                        _a.label = 7;
                    case 7:
                        if (!(i < children_length)) return [3 /*break*/, 10];
                        return [4 /*yield*/, frame.evaluate(function (i, bodyHandle) {
                                var item = bodyHandle.children.item(i);
                                if (item != null)
                                    return item.nodeName;
                            }, i, bodyHandle)];
                    case 8:
                        itemName = _a.sent();
                        this._output('itemName: ' + itemName);
                        _a.label = 9;
                    case 9:
                        i++;
                        return [3 /*break*/, 7];
                    case 10: return [4 /*yield*/, browser.close()];
                    case 11:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype._output = function (message) {
        terminal_kit_1.terminal.moveTo(0, this._line, message);
        this._line++;
    };
    return Main;
}()); // End of Main class
var m = new Main();
m.test_header();
// m.ssr('https://en.wikipedia.org/wiki/Main_Page').then(html => {});
m.ssr('https://github.com/GoogleChrome/puppeteer/issues/3051').then(function (html) { });
