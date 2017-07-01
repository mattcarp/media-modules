import Ddpid from '../src/ddpid';

describe("ddpid parsing tests", () => {
  let ddpid;
  let idString = 'DDP 2.00                         2560                                                  CD      0                                ';
  beforeAll(() => {
    ddpid = new Ddpid();
  });


  it('should parse a ddpid string', () => {
    expect(ddpid.parse(idString).ddpid).toBe('DDP 2.00');
  });

});
