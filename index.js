"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var terminal_kit_1 = require("terminal-kit");
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
//term.moveTo( 1 , 1 , 'Upper-left corner' ) ;
//term.moveTo.cyan( 1 , 1 , "My name is %s, I'm %d.\n" , 'Jack' , 32  ) ;
// Get some user input
terminal_kit_1.terminal.magenta('Enter your name: ');
terminal_kit_1.terminal.inputField(function (error, input) {
    terminal_kit_1.terminal.green("\nYour name is '%s'\n", input);
});
terminal_kit_1.terminal.grabInput({ mouse: 'button' });
terminal_kit_1.terminal.on('key', function (name, data) {
    terminal_kit_1.terminal.saveCursor();
    var xStart = 0;
    var yStart = 0;
    terminal_kit_1.terminal.getCursorLocation(function (error, x, y) {
        if (x != undefined)
            xStart = x;
        if (y != undefined)
            yStart = y;
        terminal_kit_1.terminal.moveTo(0, yStart + 2);
        console.log("'key' event:", name);
        terminal_kit_1.terminal.restoreCursor();
        // Detect CTRL-C and exit 'manually'
        if (name === 'CTRL_C') {
            process.exit();
        }
    });
});
terminal_kit_1.terminal.on('mouse', function (name, data) {
    console.log("'mouse' event:", name, data);
});
