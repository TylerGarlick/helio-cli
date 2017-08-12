import fs from 'fs'
import path from 'path'
import logger from '../logger'
import GitRepoManager from '../repo-manager'
import generateProject from '../metalsmith'
import inquirer from 'inquirer'

import newDirectoryPrompt from '../prompts/existing-directory'

/*
  Run task flow
 */

export const run = async (args) => {
  try {
    const repoMgr = new GitRepoManager
    const isCached = await repoMgr.checkCacheForRepo(args.template)

    if (!isCached) {
      logger.warn(`Cache doesn't exist for template: ${args.template} - Cloning from source into cache...`)
      const cloneResult = await repoMgr.cloneRepo(args.template)
      logger.success(`Repo cloned into cache successfully`)
    } else {
      logger.info(`Cache exists for template: ${args.template} - Checking for updates...`)
      const updateResult = await repoMgr.updateRepo(args.template)
      logger.success(`Repo updated successfully`)
    }

    const repoDir = repoMgr.formatCacheString(args.template)
    const destDir = path.resolve(args.directory)
    const projectNameFolder = process.cwd().split('/').pop()
    const templateDir = path.resolve(repoDir, 'template')
    const templateSettings = require(path.resolve(repoDir, 'settings.js'))

    let promptResults = {}
    if (typeof templateSettings === 'object' && templateSettings.hasOwnProperty('prompts')) {
      promptResults = await inquirer.prompt(templateSettings.prompts({ dirName: (args.directory === '.') ? projectNameFolder : args.directory }))
    }

    logger.info('All questions answered. Generating your project from the template...')
    const generationResult = await generateProject(templateDir, destDir, promptResults)

    // TODO: Replace with dynamic closing message from Template repos settings
    logger.warn(`\n-=-=-=-=-=-=-=-=-=-=-=-=-\n`)
    logger.success(`\nProject generated successfully! Don't forget to install dependencies...\n`)
    logger.info(`  cd ${args.directory} && npm install`)
    logger.info(`\nOR\n`)
    logger.info(`  cd ${args.directory} && yarn install`)
  } catch (e) {
    const error = (typeof e === 'object') ? e.message : e
    logger.error(error)
  }
}

/*
  Yargs Module
 */

export const command = 'init [template] [directory]'
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
  const apiPath = path.resolve(process.cwd(), apiDir)

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
