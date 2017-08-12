import fs from 'fs'
import path from 'path'
import logger from '../logger'
import GitRepoManager from '../repo-manager'

import newDirectoryPrompt from '../prompts/existing-directory'

/*
  Init generator
 */

export const run = async (args) => {
  const repoMgr = new GitRepoManager

  // Check cache
    // Cached
      // Check for update
        // Update
          // return directory
        // Return directory
    // Not cached
      // Clone into cache
        // Return Directory

  // Initialize file generator with directory

  try {
    const isCached = await repoMgr.checkCacheForRepo(args.template)

    if (!isCached) {
      logger.warn(`Cache doesn't exist for template: ${args.template} - Cloning from source into cache...`)
      const cloneResult = await repoMgr.cloneRepo(args.template)

      console.log(cloneResult)

      logger.info(`Repo cloned into cache successfully`)
    } else {
      logger.info(`Cache exists for template: ${args.template} - Checking for updates...`)
    }
  } catch (e) {
    logger.error(e.message)
  }
}

/*
  Yargs Module
 */

export const command = 'init [template] [dir]'
export const desc = 'Generate a new GraphQL CLI project from a template into a directory.'
export const builder = {
  directory: {
    alias: 'd',
    default: '.'
  },

  template: {
    alias: 't',
    default: 'helio-training-tools/helio-cli-mongoose'
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
