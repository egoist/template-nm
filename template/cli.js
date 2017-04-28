#!/usr/bin/env node
'use strict'
const yargs = require('yargs')
const pkg = require('./package')
const main = require('./')

const argv = yargs
  .version(pkg.version)
  .help()
  .argv

main(argv)
