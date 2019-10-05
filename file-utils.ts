import {stat, mkdir} from 'fs';
import {ChildProcess, spawn} from 'child_process';

export class FileUtils {
  public static isFile(path: string): Promise<boolean> {
    if (path == null) {
      return new Promise<boolean>((resolve, reject) => {
        console.log('Error: null path sent to isFile.');
        resolve(false);
      });
    }
    return new Promise<boolean>((resolve, reject) => {
      stat(path, (err, stats) => {
        if (err) {
          resolve(false);
        } else if (stats.isFile()) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }

  public static isDirectory(path: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      stat(path, (err, stats) => {
        if (err) {
          resolve(false);
        } else if (stats.isDirectory()) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }

  /**
   * Creates a directory if is doesn't already exist.
   * Returns false if the directory existed to begin with.
   * Returns true if the directory was created.
   *
   */
  public static mkDir(path: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      stat(path, (err, stats) => {
        if (err) {
          if (err.code === 'ENOENT') {
            mkdir(path, {recursive: true}, error => {
              if (error) {
                console.log(
                  'error creating directory ' + path + ': ' + error.message,
                );
              }
              resolve(true);
            });
          } else {
            console.log('Error getting stats for directory ' + path);
            console.log('Error message: ' + err.message + ', Error code: ' + err.code);
            resolve(false);
          }
        }
        resolve(false);
      });
    });
  }

  public static execute(
    command: string,
    args: Array<string>,
  ): Promise<Array<string>> {
    let ret: Array<string> = new Array<string>();
    return new Promise<Array<string>>((resolve, reject) => {
      let process: ChildProcess = spawn(command, args);
      process.on('error', err => {
        console.log('error: ' + err.message);
      });

      if (process.stdout != null) {
        process.stdout.on('data', data => {
          console.log(data.toString());
          ret.push(data.toString());
        });
      } else console.log('Error: process.stdout is null');
      if (process.stderr != null) {
        process.stderr.on('data', data => {
          console.log(data.toString());
          ret.push(data.toString());
        });
      }
      process.on('close', code => {
        resolve(ret);
      });
    });
  }
} // End of FileUtils class
