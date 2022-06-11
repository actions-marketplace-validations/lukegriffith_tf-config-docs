# Tf-Config-Docs

This project plans to implement a github action that can be added to a terrafrom code base, what'll automatically generate a github pages documentation site consisting of metadata and high level analytics of the codebase. 

The data generator is written in golang, with the front end being built in react.

## Usage


```
name: 'Terraform Documentation'
on: [push]

jobs:
  main:
    name: build docs
    runs-on: ubuntu-latest
    if: github.repository_owner == 'lukegriffith'
    steps:
    - uses: actions/checkout@v2
    - name: Terraform Docs Build
      uses: lukegriffith/tf-config-docs@alpha-v0.0.7
      with:
        data-output-path: ./docs

```