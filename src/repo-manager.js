import clone from 'git-clone'
import fs from 'fs'
import os from 'os'
import path from 'path'
import logger from './logger'
import { exec } from 'child_process'

class GitRepoManager {
  constructor () {
    this.cacheDir = path.resolve(os.homedir(), '.helio-cli-cache')
    this.ensureCacheDirExists()
  }

  checkCacheForRepo (templateString) {
    return new Promise((resolve, reject) => {
      if (!this._validTemplateString(templateString)) {
        return reject(this._githubOnlySupport())
      }

      resolve(fs.existsSync(this.formatCacheString(templateString)))
    })
  }

  cloneRepo (templateString) {
    return new Promise((resolve, reject) => {
      if (!this._validTemplateString(templateString)) {
        return reject(this._githubOnlySupport())
      }

      clone(this._getUrl(templateString), this.formatCacheString(templateString), { checkout: 'master', shallow: true }, (err) => {
        if (err) {
          return reject(err)
        }
        resolve(true)
      })
    })
  }

  ensureCacheDirExists () {
    if (!fs.existsSync(this.cacheDir)) {
      fs.mkdirSync(this.cacheDir)
      logger.info(`Created template cache at: ${this.cacheDir}`)
    }
  }

  updateRepo (templateString) {
    return new Promise((resolve, reject) => {
      if (!this._validTemplateString(templateString)) {
        return reject(this._githubOnlySupport())
      }

      exec(`cd ${this.formatCacheString(templateString)} && git pull --rebase`, (err, stdout) => {
        if (err) {
          return reject(err)
        }

        resolve(stdout)
      })
    })
  }

  formatCacheString (templateString) {
    return path.resolve(this.cacheDir, templateString.split('/')[1])
  }

  _getUrl (templateString) {
    // TODO: Extend this function to support other hosts
    return `git@github.com:${templateString}.git`
  }

  // TODO: Remove this when we support multiple hosts
  _githubOnlySupport () {
    return `We only support github URL's for now. (org-or-acct/some-repo)`
  }

  _validTemplateString (templateString) {
    return (templateString.split('/').length === 2)
  }
}

export default GitRepoManager
