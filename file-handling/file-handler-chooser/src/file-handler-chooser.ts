import FileHandlerLocal from '../../file-handler-local/src/file-handler-local';

// TOD this should call a generic environment detector which has isNode and isBrowser
export default class FileHandlerChooser {

  getHandler() {
    if (this.isNode()) {
      return new FileHandlerLocal();
    }
    if (this.isBrowser()) {
      // return new FileHandlerBrowser();
      console.error(`TODO: create FileHandlerBrowser class `);
    }
  }

  isNode() {
    return typeof global !== "undefined"
      && ({}).toString.call(global) === '[object global]';
  }

  isBrowser() {
    return typeof window !== 'undefined'
      && ({}).toString.call(window) === '[object Window]';
  }
}
