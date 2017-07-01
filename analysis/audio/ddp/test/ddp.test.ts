import Ddp from '../src/ddp';

describe("ddpid parsing tests", () => {
  let ddp;
  beforeAll(() => {
    ddp = new Ddp();
  });


  it('should return audio cd', () => {
    expect(ddp.getMasterFormat('1', '1', 'CD').name).toBe('Audio CD');
  });

  it('should return dvd-5', () => {
    expect(ddp.getMasterFormat('1', '1', 'DV').name).toBe('DVD-5');
  });

  it('should return dvd-9', () => {
    expect(ddp.getMasterFormat('1', '2', 'DV').name).toBe('DVD-9');
  });

  it('should return dvd-10', () => {
    expect(ddp.getMasterFormat('2', '1', 'DV').name).toBe('DVD-10');
  });

  it('should return dvd-18', () => {
    expect(ddp.getMasterFormat('2', '1', 'DV').name).toBe('DVD-10');
  });

  // TODO tests for the other methods of Ddp class


});
