#Media Modules

##These notes are for common operations among all the media modules

A collection of private node modules for media analysis, transfer, bundling, playback...oh my!

Uses jest for testing and Typescript for typing.

Make a new npm module:

    git clone https://github.com/alexjoverm/typescript-library-starter.git MODULENAME
    
Run tests (cd to module directory):

    npm run test:watch
    
Build for publishing:

    npm run build    
    
Publish to private npm scope (@mattcarp) - bump version number first

actually you're supposed to do something ling `npm version x.x.x` which does a commit and tags it - see circle ci docs 

    npm publish


TODO Run all tests: run the above from the project root

TODO file handler should be one single module, not multiple
