import FileHandlerChooser from '../src/file-handler-chooser';

describe("ddpid parsing tests", () => {
  let fhc;
  let msContent: string;
  beforeAll(() => {
    fhc = new FileHandlerChooser();

  });


  it('should detect that the environment is node', () => {
    expect(fhc.isNode()).toBe(true);
  });

});
