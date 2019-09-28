import {terminal as term} from 'terminal-kit';
import {openSync, closeSync, writeSync, writeFile} from 'fs';
import {launch} from 'puppeteer';
import {KeyHandler} from './key_handler';

class Main {
  private _line = 5;
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
    this._line = 5;
    const page = await browser.newPage();
    page.on('domcontentloaded', event => {
      this._output('dom content loaded');
    });
    page.on('error', error => {
      this._output('error: ' + error.message);
    });
    page.on('frameattached', frame => {
      this._output('frameattached');
    });
    page.on('load', event => {
      this._output('load');
    });

    await page.goto(url, {waitUntil: 'networkidle0'});
    this._output('network idle. frames: ' + page.frames().length);
    let frame = page.mainFrame();
    this._output('frame name: ' + frame.name());
    this._output('childFrames: ' + frame.childFrames().length);
    let handles = await frame.$$('p');
    this._output('paragraphs: ' + handles.length);
    // for (let handle of handles) {
    //   const pe = await frame.evaluate(p => {
    //     return (<HTMLParagraphElement>p).innerText;
    //   }, handle);
    //   this._output(pe);
    // }
    let children_length = await frame.$eval('body', element => {
      return (<HTMLElement>element).children.length;
    });
    this._output('children of body: ' + children_length);
    const bodyHandle = await frame.$('body');
    if (bodyHandle != null) {
      for (let i = 0; i < children_length; i++) {
        let itemName = await frame.evaluate(
          (i, bodyHandle) => {
						const item = (<HTMLElement>bodyHandle).children.item(i);
						if (item != null)
            return item.nodeName;
          },
          i,
          bodyHandle,
        );
        this._output('itemName: ' + itemName);
      }
    }

    await browser.close();
    return;
  }

  private _output(message: string) {
    term.moveTo(0, this._line, message);
    this._line++;
  }
} // End of Main class

let m = new Main();
m.test_header();

// m.ssr('https://en.wikipedia.org/wiki/Main_Page').then(html => {});

m.ssr('https://github.com/GoogleChrome/puppeteer/issues/3051').then(html => {});
