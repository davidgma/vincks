import {terminal as term} from 'terminal-kit';
import {openSync, closeSync, writeSync, writeFile} from 'fs';
import {launch} from 'puppeteer';

interface keyData {
  isCharacter: boolean;
  codepoint?: number;
  code: number | Buffer;
}

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
// term.magenta('Enter your name: ');
// term.inputField(function(error, input) {
//   term.green("\nYour name is '%s'\n", input);
// });

// term.grabInput({mouse: 'button'});
term.grabInput({});

term.on('key', function(name: string, matches: Array<string>, data: keyData) {
  term.saveCursor();
  let xStart = 0;
  let yStart = 0;
  term.getCursorLocation((error, x, y) => {
    if (x != undefined) xStart = x;
    if (y != undefined) yStart = y;
    // term.moveTo(0, yStart + 2);
    term.moveTo(0, 6);
    term.eraseDisplayBelow();

    if (Buffer.isBuffer(data.code)) {
      term('data.code is a buffer:' + data.code + "\n");
      let b = data.code as Buffer;
      //process.stdout.write(buff.toString());
    } else {
      term('data.code is a number' + "\n");
      term('data.code is: ' + data.code + "\n");
      //process.stdout.write(data.code.toString());

    }
    term("'key' event:", name + "\n");
    term('data: ' + JSON.stringify(data) + "\n");
    term('data.code ' + JSON.stringify(data.code) + "\n");
    term.restoreCursor();

    if (Buffer.isBuffer(data.code)) {
      let b = data.code as Buffer;
      process.stdout.write(b.toString());
    } else {
      term(name);
      //process.stdout.write(data.code.toString());
    }


    // Detect CTRL-C and exit 'manually'
    if (name === 'CTRL_C') {
      process.exit();
    }
  });
});

term.on('mouse', function(name: string, data: Object) {
  term("'mouse' event:", name, data + "\n");
});

async function ssr(url: string) {
  const browser = await launch({headless: true});
  const page = await browser.newPage();
  await page.goto(url, {waitUntil: 'networkidle0'});
  const html = await page.content(); // serialized HTML of page DOM.
  await browser.close();
  return html;
}

ssr('https://www.google.co.uk').then(html => {
  // console.log(html);
  // writeFile('output.html', html, err => {
  //   if (err != null) console.log('error writing file: ' + err.message);
  // });
});
