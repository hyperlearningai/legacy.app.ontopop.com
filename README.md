# Ontology Visualisation

## Introduction

Ontology visualisation web app based on NextJs/React/Redux-zero with internationalisation i18n support.

## Prerequisites

- [NodeJS](https://nodejs.org/en/download/)

## Installation

`npm install`

## Build

`npm run build`
`npm run export`  # for generating the bundle to deploy

## Run dev server

`npm run dev` # opens on http://localhost:3000

## Testing and Linting

For unit testing:
```shell script
  npm run test
  npm run test:watch
```

For linting, if using Vscode, make sure to have the following extensions installed:
- [Eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint)
- [Vscode-json](https://marketplace.visualstudio.com/items?itemName=andyyaldoo.vscode-json)

To check the lint status:
```shell script
  npm run lint
```

## Git flow

From develop branch, open a new feature branch

```shell script
  git checkout -b feature/branch-description
```

When changes are ready:
```shell script
  git commit -am 'Descriptive commit message'
  git push     ### when ready for review
```

### Definition of done

When code is ready for review, open a merge request.
The code can be moved to done when:
  - linting and unit testing are passing
  - The code changes match the ticket requirements


 