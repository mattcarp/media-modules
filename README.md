#Media Modules

##These notes are for common operations among all the media modules

This repo serves as a container, for purposes of issue aggregation and the kanban board.

A collection of private node modules for media analysis, transfer, bundling, playback...oh my!

Uses jest for testing and Typescript for typing.

Make a new npm module:

    git clone https://github.com/alexjoverm/typescript-library-starter.git MODULENAME
    
Run tests (cd to module directory):

    npm run test:watch
    
Build for publishing:

    npm run build    
    
Publish to private npm scope (@mattcarp) - bump version number first

### Publishing to NPM via CircleCi
See also: https://circleci.com/docs/1.0/npm-continuous-deployment/

Run npm version to create a new version:

    npm version x.x.x
    
This will update the package.json file and creates a tagged Git commit. Next, push the commit with tags:

    git push --follow-tags
    
If tests passed, CircleCI will publish the package to npm automatically.
