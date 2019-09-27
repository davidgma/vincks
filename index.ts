import {terminal as term} from 'terminal-kit';
import {openSync, closeSync, writeSync, writeFile} from 'fs';
import {launch} from 'puppeteer';
import {KeyHandler} from './key_handler';

interface keyData {
  isCharacter: boolean;
  codepoint?: number;
  code: number | Buffer;
}

class Main {
  private _keyHandler: KeyHandler = new KeyHandler();
  constructor() {
    term.grabInput({});
    // term.grabInput({mouse: 'button'});
    term.on('key', this._keyHandler.handle_key);
    // term.on('mouse', this._keyHandler.handle_mouse);
  }

  test_header() {
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
  }

  async ssr(url: string) {
    const browser = await launch({headless: true});
		
    const page = await browser.newPage();
    await page.goto(url, {waitUntil: 'networkidle0'});
    const html = await page.content(); // serialized HTML of page DOM.
    await browser.close();
    return html;
  }
}

let m = new Main();
m.test_header();

m.ssr('https://www.google.co.uk').then(html => {
  // term.white(html);
  for (let i = 0; i < 5; i++) {
    term.white('hello world\n');
  }
  // writeFile('output.html', html, err => {
  //   if (err != null) console.log('error writing file: ' + err.message);
  // });
});
