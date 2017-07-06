import Ddppq from '../src/ddppq';

describe('pq parsing tests', () => {
  let ddppq;
  let pqContent = 'VVVS0000  00000001                                              VVVS0100  00000001  USSM11404613                                VVVS0101  00020001                                              VVVS0201  03174101  USAER0810033                                VVVS0301  05424901  USA560855330                                VVVS0401  10146001  USAER0710364                                VVVS0501  12476501  US4DG1500606                                VVVS0601  18266201  USDC39400013                                VVVS0701  23367001  USAT20619152                                VVVS0801  30360801  USWB19901095                                VVVS0901  33371601  USRC10301819                                VVVS1001  38443501  USYD70810046                                VVVS1101  42001001  USJ5G1500001                                VVVS1201  44495101  US4DG1500607                                VVVS1301  45475201  TCABP1357122                                VVVS1401  49542001  CA7QH1200004                                VVVS1501  55484501  USTC40881787                                VVVS1601  59383201  QMW3D1100010                                VVVS1701  65340801  GBAAA8900510                                VVVS1801  70490701  US3841400046                                VVVS1901  75204501  US4DG1500608                                VVVSAA01  79250101                                              VVVSAA01  79250101                                              ';
  beforeAll(() => {
    ddppq = new Ddppq();
  });

  it('should parse a pq string', () => {
    expect(ddppq.parse(pqContent).entries[6].isrc).toBe('US4DG1500606');
  });

});
