# Tf-Config-Docs

Project utilises the `hashicorp/terraform-config-inspect` golang library to obtain high level metadata about a given terraform codebase, and has a react app that presents a user interface for it. Future features will include a query search for similar modules, versions, etc and anayltics on the codebase.

Project can easily be added to any terraform codebase in github, by adding the action to render the documents website, **this will overwrite the target branch (docs by default) ./docs folder**

## Example

A fork of the eks module has been used to demonstrate the potentail of the project;

[Example Site](https://lukegriffith.github.io/terraform-aws-eks/)

## Usage

Enable github pages on the given repository, and set the branch to docs, with the folder being ./docs.

Add the following workflow to `.github/workflows/actions.yaml`

Currently, the docs branch needs to be unprotected for this action to work.

```
name: 'Terraform Documentation'
on:
  push:
    branches:
      - master

jobs:
  main:
    name: build docs
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - name: Terraform Docs Build
      uses: lukegriffith/tf-config-docs@alpha-v0.0.7
```