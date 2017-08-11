import chalk from 'chalk'

export default {
  log: (message) => {
    console.log(chalk.green(message))
  },

  error: (err) => {
    console.error(chalk.red(err))
  },

  info: (info) => {
    console.log(chalk.cyan(info))
  },

  warn: (warning) => {
    console.warn(chalk.yellow(warning))
  }
}
