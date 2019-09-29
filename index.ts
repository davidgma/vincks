import {terminal as term} from 'terminal-kit';
import {writeFile, mkdir} from 'fs';
import {launch} from 'puppeteer';
import {KeyHandler} from './key_handler';
import {JSDOM} from 'jsdom';

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
    // this._clearAll();
    term.fullscreen(true);
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
      this._output('loaded');
    });

    // await page.goto(url, {waitUntil: 'networkidle0'});
    await page.goto(url);
    const html = await page.content();
    const dom = new JSDOM(html);
    // let paras = dom.window.document.getElementsByTagName('p');
    const children = dom.window.document.children;
    this._output('number of children: ' + children.length);
    let rawContent = this._iterateOverDom(dom.window.document.documentElement);
    this._output('lines of raw content: ' + rawContent.length);
    mkdir('/dev/shm/vincks', error => {
      if (error != null)
        this._output('Error creating directory: ' + error.message) + '\n';

      writeFile('/dev/shm/vincks/rawContent.txt', rawContent, error => {
        if (error != null)
          this._output('Error writing file: ' + error.message) + '\n';
        this._output('Finished writing the raw file');
      });
    });
    await browser.close();
    return;
  }

  private _iterateOverDom(
    parentElement: HTMLElement,
    level: number = 0,
  ): string {
    let ret = '';
    if (parentElement.nodeName == '#text') {
      if (
        parentElement.textContent != null &&
        parentElement.textContent.trim() != '#text' &&
        parentElement.textContent.trim().length > 0
      )
        ret =
          parentElement.nodeName +
          ' ' +
          parentElement.textContent.trim() +
          '\n';
    } else if (parentElement.nodeName == 'A') {
      ret =
        parentElement.nodeName +
        ' ' +
        (<HTMLAnchorElement>parentElement).innerHTML +
        '\n';
    } else {
      ret = "'" + parentElement.nodeName + "'" + '\n';
    }
    if (parentElement.childElementCount > 0) {
      level++;
      parentElement.childNodes.forEach(child => {
        ret +=
          ' '.repeat(level) + this._iterateOverDom(<HTMLElement>child, level);
      });
    }
    return ret;
  }

  private _output(message: string) {
    term.moveTo(0, this._line, message);
    this._line++;
  }
} // End of Main class

let m = new Main();
m.test_header();

// m.ssr('https://en.wikipedia.org/wiki/Main_Page').then(html => {});

m.ssr('https://en.wikipedia.org/wiki/Oliver_Twist').then(html => {});
