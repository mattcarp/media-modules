import { default as FileHandlerLocal } from '../src/file-handler-local';


describe('local file handler tests', () => {
  let fh;
  beforeAll(() => {
    fh = new FileHandlerLocal();
  });


  // pattern for testing a method that returns a promise
  it('can read a ddpid file', () => {
    return fh.readAsString('../assets/DDPID').then(text => {
      console.log(`TEXT!`, text);
      expect(text).toContain('DDP 2.00');
    })
      .catch((err) => {
      console.error(`error!`, err);
      });
  });


});
