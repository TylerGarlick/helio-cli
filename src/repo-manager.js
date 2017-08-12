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

  async checkCacheForUpdates () {

  }

  checkCacheForRepo (templateString) {
    return new Promise((resolve, reject) => {
      if (!this._validTemplateString(templateString)) {
        return reject(`We only support github URL's for now. (org-or-acct/some-repo)`)
      }

      resolve(fs.existsSync(this._formatCacheString(templateString)))
    })
  }

  cloneRepo (templateString) {
    return new Promise((resolve, reject) => {
      if (!this._validTemplateString(templateString)) {
        return reject(`We only support github URL's for now. (org-or-acct/some-repo)`)
      }

      downloadGitRepo(templateString, this._formatCacheString(templateString), { clone: true }, (err) => {
        if (err) {
          return reject(err)
        }
        resolve(true)
      })
    })
  }

  ensureCacheDirExists () {
    try {
      if (!fs.existsSync(this.cacheDir)) {
        fs.mkdirSync(this.cacheDir)
        logger.info(`Created template cache at: ${this.cacheDir}`)
      }
    } catch (e) {
      throw e
    }
  }

  async updateRepo (repoName) {

  }

  _formatCacheString (templateString) {
    return path.resolve(this.cacheDir, templateString.split('/')[1])
  }

  _validTemplateString (templateString) {
    return (templateString.split('/').length === 2)
  }
}

export default GitRepoManager
