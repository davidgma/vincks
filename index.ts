import {terminal as term} from 'terminal-kit';
import {openSync, closeSync, writeSync} from 'fs';
term.clear();
let buff = Buffer.from([27, 91, 51, 74]);
process.stdout.write(buff.toString());
term.black.bgWhite('black');
term.red(' red ');
term.green('green ');
term.yellow('yellow ');
term.blue.bgWhite('blue');
term.magenta(' magenta ');
term.cyan('cyan ');
term.white('white ');
term.brightBlack.bgWhite('bright black');
term.brightRed(' bright red ');
term.brightGreen('bright green ');
term.brightYellow('bright yellow ');
term.brightBlue('bright blue ');
term.brightMagenta('bright magenta ');
term.brightCyan('bright cyan ');
term.brightWhite('bright white\n');
term.bold('The terminal size is %dx%d\n', term.width, term.height);
//term.moveTo( 1 , 1 , 'Upper-left corner' ) ;
//term.moveTo.cyan( 1 , 1 , "My name is %s, I'm %d.\n" , 'Jack' , 32  ) ;

// Get some user input
term.magenta('Enter your name: ');
term.inputField(function(error, input) {
  term.green("\nYour name is '%s'\n", input);
});

term.grabInput({mouse: 'button'});

term.on('key', function(name: string, data: Object) {
  term.saveCursor();
  let xStart = 0;
  let yStart = 0;
  term.getCursorLocation((error, x, y) => {
    if (x != undefined) xStart = x;
    if (y != undefined) yStart = y;
    term.moveTo(0, yStart + 2);
    console.log("'key' event:", name);
    term.restoreCursor();
    // Detect CTRL-C and exit 'manually'
    if (name === 'CTRL_C') {
      process.exit();
    }
  });
});

term.on('mouse', function(name: string, data: Object) {
  console.log("'mouse' event:", name, data);
});
