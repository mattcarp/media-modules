import Ddpms from '../src/ddpms';
import FileHandlerLocal from '../../../../file-handling/file-handler-local/src/file-handler-local';

describe("ddpid parsing tests", () => {
  let ddpms;
  let msContent = 'VVVMS0        00001472        PQ DESCR                                 017DDPPQ                                                 VVVMD0        00014816                DA00     150     0101            017IC01.TRK                                              VVVMD0        0001088300014816        DA00       0     0201            017IC02.TRK                                              VVVMD0        0002041100025699        DA00       0     0301            017IC03.TRK                                              VVVMD0        0001148000046110        DA00       0     0401            017IC04.TRK                                              VVVMD0        0002542200057590        DA00       0     0501            017IC05.TRK                                              VVVMD0        0002325800083012        DA00       0     0601            017IC06.TRK                                              VVVMD0        0003143800106270        DA00       0     0701            017IC07.TRK                                              VVVMD0        0001358300137708        DA00       0     0801            017IC08.TRK                                              VVVMD0        0002304400151291        DA00       0     0901            017IC09.TRK                                              VVVMD0        0001467500174335        DA00       0     1001            017IC10.TRK                                              VVVMD0        0001271600189010        DA00       0     1101            017IC11.TRK                                              VVVMD0        0000435100201726        DA00       0     1201            017IC12.TRK                                              VVVMD0        0001849300206077        DA00       0     1301            017IC13.TRK                                              VVVMD0        0002657500224570        DA00       0     1401            017IC14.TRK                                              VVVMD0        0001723700251145        DA00       0     1501            017IC15.TRK                                              VVVMD0        0002667600268382        DA00       0     1601            017IC16.TRK                                              VVVMD0        0002362400295058        DA00       0     1701            017IC17.TRK                                              VVVMD0        0002036300318682        DA00       0     1801            017IC18.TRK                                              VVVMD0        0001833100339045        DA00       0 150 1901            017IC19.TRK                                              ';
  let fileHandler;
  beforeAll(() => {
    ddpms = new Ddpms();
  });


  it('should parse a ddpms string', () => {
    expect(ddpms.parse(msContent).entries[0].sub).toBe('PQ DESCR');
  });

});
