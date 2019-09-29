import {terminal as term} from 'terminal-kit';

/**
 * The data sent in a key press event.
 *
 * @param isCharacter - true is a single character was pressed.
 * False is a key combination was pressed.
 */
interface keyData {
  isCharacter: boolean;
  codepoint?: number;
  code: number | Buffer;
}

export class KeyHandler {
  public ready: Promise<void>;

  constructor() {
    this.ready = new Promise<void>(resolve => {
      this._setUp().then(() => {
        resolve();
      });
    });
  }

  private async _setUp() {}

  handle_key(name: string, matches: Array<string>, data: keyData) {
    term.saveCursor();
    term.moveTo(0, term.height - 6);
    term.eraseDisplayBelow();
    if (Buffer.isBuffer(data.code)) {
      term('data.code is a buffer:' + data.code + '\n');
      let b = data.code as Buffer;
      //process.stdout.write(buff.toString());
    } else {
      term('data.code is a number' + '\n');
      term('data.code is: ' + data.code + '\n');
      //process.stdout.write(data.code.toString());
    }
    term("'key' event:", name + '\n');
    term('data: ' + JSON.stringify(data) + '\n');
    if (Buffer.isBuffer(data.code)) {
      let b = data.code as Buffer;
      process.stdout.write(b.toString());
    } else {
      term(name);
      //process.stdout.write(data.code.toString());
    }
    term.restoreCursor();

    // Detect CTRL-C and exit 'manually'
    if (name === 'CTRL_C') {
			term.fullscreen(false);
      process.exit();
    }
  }

  handle_mouse(name: string, data: Object) {
    term("'mouse' event:", name, data + '\n');
  }
}
