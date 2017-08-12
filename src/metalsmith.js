import Metalsmith from 'metalsmith'
import inPlace from 'metalsmith-in-place'
import { spawn } from 'child_process'

export default (templateDir, destDir, options, clean = true) => {
  return new Promise((resolve, reject) => {
    Metalsmith(__dirname)
      .metadata(options)
      .source(templateDir)
      .destination(destDir)
      .clean(clean)
      .use(inPlace({
        engineOptions: {
          cache: false
        }
      }))
      .build((err) => {
        if (err) {
          return reject(err)
        }

        return resolve()
      })
  })
}
