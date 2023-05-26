# Workflow

This project uses [Git-Flow](https://www.gitkraken.com/learn/git/git-flow),
[git-flow tool](https://github.com/nvie/gitflow) can be used.

### The Git flow branches that we are interested in are the following branches :

- `develop` (long lived) - latest development work, deploys to a dev environment
- `feature/*`(short lived) - new functional, docs, build, CI, test development work
- `fix/*`(short lived) - fixes of functional, docs, build, CI, test development work
- `release/*` (short lived) - release candidate, bug fixes for a release, deploys to a test environment
- `main` (long lived) - last release, deploys to a production environment
- `hotfix/*` (short lived) - urgent fixes to production

### Information in the pull request

Attach a link to the task to the description of the pull request.

### The naming of branches:

`feature (or fix, release, hotfix)/<task number>-<task name>`: task number - number of task in trello; task name - appropriate task title;

Exemple: `feature/<387>-authorization`.

### How to appoint reviewers:

We assign 2, send them to the chat, everyone can watch and ask questions.
