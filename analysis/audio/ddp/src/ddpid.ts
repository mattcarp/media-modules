export default class Ddpid {

  parse(ddpidContent: string) {
    const parsedId = {
      ddpid: ddpidContent.substring(0, 8),
      upc: ddpidContent.substring(8, 21).trim(),
      mss: ddpidContent.substring(21, 29),
      msl: ddpidContent.substring(29, 37),
      med: ddpidContent[37],
      mid: ddpidContent.substring(38, 86).trim(),
      bk: ddpidContent[86],
      type_: ddpidContent.substring(87, 89),
      nside: ddpidContent[89],
      side: ddpidContent[90],
      nlayer: ddpidContent[91],
      layer: ddpidContent[92],
      txt: ddpidContent.substring(95, 128).trim()
    };

    return parsedId;
  } // parse
}
