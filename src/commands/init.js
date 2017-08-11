import fs from 'fs'
import path from 'path'
import logger from '../logger'
import GitRepoManager from '../repo-manager'

import newDirectoryPrompt from '../prompts/existing-directory'

export const run = async (args) => {
  const repoMgr = new GitRepoManager()
  /*
   TODO: Fire the generators
  */
  logger.info('Fire the generators')
}

export const command = 'init [template] [dir]'
export const desc = 'Generate a new GraphQL CLI project from a template into a directory.'
export const builder = {
  directory: {
    alias: 'd',
    default: '.'
  },

  template: {
    alias: 't',
    default: 'mongoose'
  }
}
export const handler = async (argv) => {
  const apiDir = argv.directory
  const apiPath = path.resolve(__dirname, apiDir)

  try {
    if (fs.existsSync(apiPath)) {
      const { ok } = await newDirectoryPrompt(apiPath)

      if (ok) {
        await run(argv)
      }
    } else {
      await run(argv)
    }
  } catch (err) {
    throw err
  }
}
