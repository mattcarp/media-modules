// utility methods for DDP parsing
export default class Ddp {
  FRAMES_PER_SECOND = 75;


  getMasterFormat(nside: string, nlayer: string, ddpType: string) {
    let masterFormat: any = {};
    let numSides = parseInt(nside, 10);
    let numLayers = parseInt(nlayer, 10);
    if (ddpType === 'DV') {
      if (numSides === 1 && numLayers === 1) {
        masterFormat.name = 'DVD-5';
        masterFormat.explanation = 'single sided, single layer';
      }
      if (numSides === 1 && numLayers === 2) {
        masterFormat.name = 'DVD-9';
        masterFormat.explanation = 'single sided, dual layer';
      }
      if (numSides === 2 && numLayers === 1) {
        masterFormat.name = 'DVD-10';
        masterFormat.explanation = 'dual sided, single layer';
      }
      if (numSides === 2 && numLayers === 2) {
        masterFormat.name = 'DVD-18';
        masterFormat.explanation = 'dual sided, dual layer';
      }
    }
    if (ddpType === 'CD') {
      masterFormat.name = 'Audio CD';
      masterFormat.explanation = 'DDP audio disc master';
    }
    return masterFormat;
  }

  // creates a gracenote-compatible table of contents
  createToc(parsedPq: Array<any>): string {
    let tocArray: Array<number> = [];
    for (let currentEntry of parsedPq) {
      if (currentEntry.min && parseInt(currentEntry.idx, 10) > 0) {
        tocArray.push(this.timeToFrames(
          currentEntry.min + ':' + currentEntry.sec + ':' + currentEntry.frm
        ));
      }
    }
    // if leadout is repeated, remove last entry
    console.log(tocArray[tocArray.length - 1], tocArray[tocArray.length - 2]);
    if (tocArray[tocArray.length - 1] === tocArray[tocArray.length - 2]) {
      tocArray.pop();
    }
    console.log('toc array');
    console.log(tocArray);
    let toc: string = tocArray.join(' ');
    return toc;

  }

  timeToFrames(timeString: string) {
    let frames = 0;
    let mins = parseInt(timeString.substr(0, 2), 10);
    let secs = parseInt(timeString.substr(3, 2), 10);
    let frm = parseInt(timeString.substr(6, 2), 10);
    frames = (mins * 60 * 75) + (secs * 75) + frm;
    return frames;
  }

  /**
   * Takes cd frames and returns time string: MM:SS:FF
   * - hours are not used in the DDP 2.0 spec
   * @param   {Number} frames total number of frames
   * @returns {String} time string
   */
  framesToTime(cdFrames: number) {
    const frames = cdFrames % this.FRAMES_PER_SECOND;
    const totalSeconds = Math.floor(cdFrames / this.FRAMES_PER_SECOND);
    const seconds = totalSeconds % 60;
    const minutes = Math.floor(totalSeconds / 60);
    const paddedFrames = this.padField(frames);
    const paddedseconds = this.padField(seconds);
    const paddedminutes = this.padField(minutes);

    const timeString = paddedminutes + ':' + paddedseconds + ':' + paddedFrames;

    return timeString;
  } // framesToTime

  // if a field is single-digit, prepend a 0
  padField(field: number): string {
    if (field.toString().length < 2) {
      return '0' + field;
    }
    return field.toString();
  }

  // TODO given an array of pq and ms entries (or the count of audio entries
  // for each), return true if map stream audio entries is 1, but pq audio
  // entries are > 1
  isConsolidated(): boolean {
    return true;
  }
}
