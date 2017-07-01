import * as fs from 'fs-extra';

export default class FileHandlerLocal {

  // returns a promise - handle the error in the .catch block of the caller
  readAsString(filename: string, encoding = 'utf8') {
    // TODO return error if file is too large
    return fs.readFile(filename, encoding);
  }

  // TODO read chunk as string, readAsBuffer, readChunkAsBuffer
}
