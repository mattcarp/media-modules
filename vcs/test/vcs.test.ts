import Vcs from '../src/vcs';

let vcs;

beforeAll(() => {
  vcs = new Vcs();
});

it('DummyClass is instantiable', () => {
  expect(new Vcs()).toBeInstanceOf(Vcs);
});

it('should get list of commits', () => {
  // TODO simpleGit.log returns a callback - use test pattern from the blockchain module
  console.log(`doh`, vcs.simpleGit.log().ListLogSummary);
  expect(vcs.simpleGit.log().ListLogSummary).toContain('sumpin');
});
