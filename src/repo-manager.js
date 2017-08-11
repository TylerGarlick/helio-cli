import downloadGitRepo from 'download-git-repo'
import fs from 'fs'
import os from 'os'
import path from 'path'
import logger from './logger'

class GitRepoManager {
  constructor () {
    this.cacheDir = path.resolve(os.homedir(), '.helio-cli-cache')
    this.ensureCacheDirExists()
  }

  checkCacheForRepo (repoName) {

  }

  checkCacheForUpdates () {

  }

  cloneRepo (repoName) {

  }

  ensureCacheDirExists () {
    try {
      if (!fs.existsSync(this.cacheDir)) {
        fs.mkdirSync(this.cacheDir)
        logger.info(`Created template cache at: ${this.cacheDir}`)
      }
    } catch (e) {
      logger.error(e.message)
      throw e
    }
  }

  updateRepo (repoName) {

  }
}

export default GitRepoManager
