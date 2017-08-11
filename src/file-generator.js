import Metalsmith from 'metalsmith'
import layouts from 'metalsmith-layouts'

export default (templateDir, destDir, options, clean = true) => {
  return new Promise((resolve, reject) => {
    Metalsmith(__dirname)
      .metadata(options)
      .source(templateDir)
      .destination(destDir)
      .clean(clean)
      .use(layouts({
        engine: 'handlebars'
      }))
      .build((err) => {
        if (err) {
          return reject(err)
        }

        return resolve()
      })
  })
}
