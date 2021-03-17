# Ontology Visualisation

## Build status


| Development  | Main  |
| :----------: | :---: |
| [![Build Status](https://dev.azure.com/hyperlearningai/Ontology%20Framework/_apis/build/status/Ontology%20Visualisation%20Dev?branchName=develop)] | [![Build Status](https://dev.azure.com/hyperlearningai/Ontology%20Framework/_apis/build/status/Ontology%20Visualisation%20Production?branchName=main)] |
| [![Build Status](https://dev.azure.com/hyperlearningai/Ontology%20Framework/_apis/build/status/Ontology%20Visualisation%20Dev?branchName=develop)](https://dev.azure.com/hyperlearningai/Ontology%20Framework/_build/latest?definitionId=4&branchName=develop) | [![Build status](https://dev.azure.com/hyperlearningai/Ontology%20Framework/_apis/build/status/Ontology%20Visualisation%20Production)](https://dev.azure.com/hyperlearningai/Ontology%20Framework/_build/latest?definitionId=5) |



## Introduction

Ontology visualisation web app based on NextJs/React/Redux-zero with internationalisation i18n support.

## Prerequisites

- [NodeJS](https://nodejs.org/en/download/)

## Installation

`npm install`

If having issues with starting the application: 

```shell script
  rm -rf node_modules
  npm i
  npx browserslist@latest --update-db
  npm rebuild node-sass
  npm audit fix
```

## Build

`npm run build`

## Run API server

Download the API server from https://github.com/hyperlearningai/ontology-framework/releases/tag/v0.0.1-alpha
Unzip and from the root folder run

`./bin/start-ontology-knowledge-graph-api.sh ` # opens on http://localhost:8080

## Run dev server

`npm run dev` # opens on http://localhost:3000

To test the build output:
 `npm run start` # opens on http://localhost:3000

## Testing and Linting

For unit testing:
```shell script
  npm run test
  npm run test:watch
```

For e2e testing:
```shell script
  npm run test:e2e:open   # run npm run dev in a different terminal
  npm run test:e2e:run    # used by the pipeline | run npm run build first if you want to test it
```

For linting, if using VSCode, make sure to have the following extensions installed:
- [Eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint)
- [Vscode-json](https://marketplace.visualstudio.com/items?itemName=andyyaldoo.vscode-json)

To check the lint status:
```shell script
  npm run lint
```

## Docs 
JSDoc is used to document API parameters.

Extension for JSDocs on VSCode:
- [JSDoc Viewer](https://marketplace.visualstudio.com/items?itemName=Shinworks.jsdoc-view)


## Git flow

From develop branch, open a new feature branch

```shell script
  git checkout -b feature/ONTOLOGY-XX_branch-description
```

When changes are ready:
```shell script
  git commit -am 'ONTOLOGY-XX Descriptive commit message'
  git push     ### when ready for review
```

### Definition of done

When code is ready for review, open a merge request.
The code can be moved to done when:
  - linting and unit testing are passing
  - The code changes match the ticket requirements.

If minor requirements are not match for any reason agreed with them team, raise a tech debt in the backlog.

 