


export default class Vcs {
  simpleGit = require('simple-git')('/Users/mcarpent/projects/media-client-repo');
  constructor() {
    // TODO temp - set to directory of media git repo, whose remote is aws codeCommit
    // const simpleGit = require('simple-git')('/Users/mcarpent/projects/media-client-repo');
    // console.log(`simple git:  `, simpleGit);
    // this.simpleGit.log((err, log) => {
    //   if (err) { throw Error('that sucked'); }
    //   console.log(log);
    // });
  }

  getLog() {
    this.simpleGit.log((err, log) => {
      if (err) { throw Error('that sucked'); }
      console.log(log);
    });
  }

}
