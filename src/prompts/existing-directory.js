import inquirer from 'inquirer'

export default function (apiName) {
  return inquirer.prompt([{
    type: 'confirm',
    message: (apiName === '.')
      ? 'Generate project in current directory?'
      : 'Target directory exists. Continue?',
    name: 'ok'
  }])
}
