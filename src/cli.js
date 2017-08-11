import 'babel-polyfill'
import yargs from 'yargs'

yargs // eslint-disable-line
  .commandDir('commands')
  .demandCommand()
  .help()
  .argv
