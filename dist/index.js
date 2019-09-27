"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
            var browser, page, html;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, puppeteer_1.launch({ headless: true })];
                    case 1:
                        browser = _a.sent();
                        return [4 /*yield*/, browser.newPage()];
                    case 2:
                        page = _a.sent();
                        return [4 /*yield*/, page.goto(url, { waitUntil: 'networkidle0' })];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, page.content()];
                    case 4:
                        html = _a.sent();
                        return [4 /*yield*/, browser.close()];
                    case 5:
                        _a.sent();
                        return [2 /*return*/, html];
                }
            });
        });
    };
    return Main;
}());
var m = new Main();
m.test_header();
m.ssr('https://www.google.co.uk').then(function (html) {
    // term.white(html);
    for (var i = 0; i < 5; i++) {
        terminal_kit_1.terminal.white('hello world\n');
    }
    // writeFile('output.html', html, err => {
    //   if (err != null) console.log('error writing file: ' + err.message);
    // });
});
