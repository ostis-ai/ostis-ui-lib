# How to make a release

When one is ready to make a release the following steps should be done:

## Prepare a changelog

The changelog is located in docs/changelog.md. It has a common info on how to keep it and info for every version and changes for released version. Once you are ready, describe version to be released, what was done, etc.

## Create a tag for version in main branch

### Manually

- Go to main branch `git checkout main`
- Set required version in package.json directly changing `version`. For example, `0.0.1-beta.1`
- Create a tag for given version. `git tag v0.0.1-beta.1`. Ensure to put `v` in the beginning of a tag - this is very important.
- Push your tag `git push` and `git push --tags`
- Go to github actions, select `release` action, run workflow, select created tag, run workflow

### Using npm version

- Go to main branch `git checkout main`
- run `npm version`, according to what kind of release it is: patch, minor or major. This command creates a tag with new version in it
- To ensure that tag is created correctly one may run `git tag --list`
- Push your tag `git push` and `git push --tags`
- Go to github actions, select `release` action, run workflow, select created tag, run workflow

### Error handling

- `release` github workflow consists of two: `npm publish` and `github release`. If one of them breaks one will be able to run each of them manually, selecting a target tag
