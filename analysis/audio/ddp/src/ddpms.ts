export default class Ddpms {
  BLOCK_SIZE = 128;

  parse(ddpmsContent: string) {

    let msArr: MsEntries = [];
    // divide ms content into 128 byte blocks
    let re = new RegExp('.{1,' + this.BLOCK_SIZE + '}', 'g');
    let entries: any = ddpmsContent.match(re);
    for (let i = 0; i < entries.length; i++) {
      msArr[i] = this.parseSingleBlock(entries[i]);
    }

    let parsedMs = {
      entries: msArr
    };
    return parsedMs;
  } // parse

  parseSingleBlock(block: any) {
    let blockObj: any = {};
    blockObj.dst = block.substring(4, 6);
    blockObj.dsp = block.substring(6, 14);
    blockObj.mpv = block.substring(0, 4);
    blockObj.dsl = parseInt(block.substring(14, 22), 10);
    blockObj.dss = block.substring(22, 30);
    blockObj.sub = block.substring(30, 38);
    blockObj.cdm = block.substring(38, 40);
    blockObj.ssm = block.substring(40, 41);
    blockObj.scr = block.substring(41, 42);
    blockObj.pre1 = block.substring(42, 46);
    blockObj.pre2 = block.substring(46, 50);
    blockObj.pst = block.substring(50, 54);
    blockObj.med = block.substring(54, 55);
    blockObj.trk = block.substring(55, 57);
    blockObj.idx = block.substring(57, 59);
    blockObj.isrc = block.substring(59, 71);
    blockObj.siz = block.substring(71, 74);
    blockObj.dsi = block.substring(74, 91).trim();
    blockObj.new_ = block.substring(91, 92); // 'new' is a JS keyword
    blockObj.pre1nxt = block.substring(92, 96);
    blockObj.pauseadd = block.substring(96, 104);
    blockObj.ofs = block.substring(104, 113);
    blockObj.pad = block.substring(113);

    // adjust the file size, as the calculation is dependent on file type
    blockObj.fileSize = this.getFileSize(blockObj.cdm, blockObj.dsl);

    return blockObj;
  } // parseSingleBlock

  getOverallDuration(ddpmsObjs: any) {
    // TODOmc remove the track 1 pregap from the result
    /*
     see Java DDPValidator.getTrkOneGapFromMs(DDPMS[] msEntries)
     */
    if (ddpmsObjs === undefined) {
      return;
    }
    // in frames:
    let streamStart;
    let streamLength;
    // start from the end
    for (let i = ddpmsObjs.length - 1; i > -1; i--) {
      let currentEntry = ddpmsObjs[i];
      // we're artificially pushing a DDPID entry onto the DDPMS array,
      // so we have to ignore it here
      if (currentEntry !== undefined && currentEntry.dsi !== 'DDPID'
        && currentEntry.cdm.trim().toUpperCase() === 'DA') {
        // we are on the last DA entry
        // dsl can be either a string or an int
        streamLength = parseInt(ddpmsObjs[i].dsl, 10);
        streamStart = parseInt(ddpmsObjs[i].dss, 10);
        // if there's no dss, then DDP is consolidated
        if (!isNaN(streamStart)) {
          return streamStart + streamLength;
        } else {
          return streamLength;
        }
      }
    }
    return null;
  } // getOverallDuration

  // should work for split and consolidated
  getTrackCount(ddpmsObjs: any) {
    if (ddpmsObjs === undefined) {
      return;
    }
    // start from the end
    for (let i = ddpmsObjs.length; i > -1; i--) {
      if (ddpmsObjs[i] !== undefined && ddpmsObjs[i].cdm.trim().toUpperCase() === 'DA') {
        // we are on the last DA entry
        // dsl can be either a string or an int
//          streamLength = parseInt(ddpmsObjs[i].dsl, 10);
        let dsl = parseInt(ddpmsObjs[i].dss, 10);

        console.log(parseInt(ddpmsObjs[i].trk, 10));
//          // if there's no dss, then DDP is consolidated
        if (!isNaN(dsl)) {
          console.log('this one is split');
        } else {
          console.log('this one is consolidated');
        }
      }
    }
    return null;
  }

  getPqEntry(ddpmsObjs: any) {
    let pqObj: any = {};
    pqObj.exists = false;
    for (let i = 0; i < ddpmsObjs.length; i++) {
      if (ddpmsObjs[i].sub.trim() === 'PQ DESCR') {
        pqObj.exists = true;
        pqObj.mpv = ddpmsObjs[i].mpv.trim();
        pqObj.dsl = ddpmsObjs[i].dsl.trim();
        pqObj.siz = ddpmsObjs[i].siz.trim();
        pqObj.sub = ddpmsObjs[i].sub.trim();
        pqObj.dsi = ddpmsObjs[i].dsi.trim();
      }
    }
    return pqObj;
  } // getPqEntry

  getCdTextEntry (ddpmsObjs: any) {
    let cdTextObj: any = {};
    cdTextObj.exists = false;
    for (let i = 0; i < ddpmsObjs.length; i++) {
      if (ddpmsObjs[i].sub.trim() === 'CDTEXT') {
        cdTextObj.exists = true;
        cdTextObj.mpv = ddpmsObjs[i].mpv.trim();
        cdTextObj.dsl = ddpmsObjs[i].dsl.trim();
        cdTextObj.siz = ddpmsObjs[i].siz.trim();
        cdTextObj.sub = ddpmsObjs[i].sub.trim();
        cdTextObj.dsi = ddpmsObjs[i].dsi.trim();
      }
    }
    return cdTextObj;
  } // getCdTextEntry

  getFileSize(cdm: string, dsl: string) {
    let BYTES_PER_SECTOR = 2352;
    let fileSize;
    let numSectors;
    // allow for dsl with leading zeros
    const dslNum = parseInt(dsl, 10);
    // binary media file lengths are calculated differently than text files
    if (cdm === 'DA' || cdm === 'DV') {
      numSectors = dslNum;
      fileSize = numSectors * BYTES_PER_SECTOR;
    } else {
      fileSize = dslNum;
    }

    return fileSize;
  } // getFileSize

  getAudioEntries(parsedDdpMs: any) {
    let audioEntries = [];
    let audioEntry: any = {};
    let ddpmsObjs = parsedDdpMs.entries;
    console.log('wha?, ms objs', ddpmsObjs);
    for (let i = 0; i < ddpmsObjs.length; i++) {
      if (ddpmsObjs[i].cdm.trim() === 'DA') {
        audioEntry = {};
        audioEntry.mpv = ddpmsObjs[i].mpv.trim();
        audioEntry.isrc = ddpmsObjs[i].isrc.trim();
        // dsl can be string or integer
        audioEntry.dsl = (ddpmsObjs[i].dsl).toString().trim();
        audioEntry.siz = ddpmsObjs[i].siz.trim();
        audioEntry.sub = ddpmsObjs[i].sub.trim();
        audioEntry.dsi = ddpmsObjs[i].dsi.trim();
        audioEntry.trk = ddpmsObjs[i].trk.trim();
        audioEntry.idx = ddpmsObjs[i].idx.trim();

        audioEntries.push(audioEntry);
      }
    }
    return audioEntries;
  } // getAudioEntries


} // class

// interfaces
export interface MsEntries extends Array<MsEntry> {}
export interface MsEntry {
  dst: string;
  dsp: string;
  mpv: string;
  dsl: string;
  dss: string;
  sub: string;
  cdm: string;
  ssm: string;
  scr: string;
  pre1: string;
  pre2: string;
  pst: string;
  med: string;
  trk: string;
  idx: string;
  isrc: string;
  siz: string;
  dsi: string;
  new_: string; // 'new' is a JS keyword
  pre1nxt: string;
  pauseadd: string;
  ofs: string;
  pad: string;
}
