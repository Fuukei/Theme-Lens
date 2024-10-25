import path from 'node:path'
import fs from 'fs-extra'
import { removeBuild, resolvePath, updatePackageJson } from '../../../scripts/build-helper.mjs'

removeBuild(import.meta.url)

const { __dirname, INPUT_DIR } = resolvePath(import.meta.url)
const __root = path.resolve(__dirname, '../')
const pkg = path.resolve(__root, './package.json')

updatePackageJson(pkg)

// update package.json > "exports" for local
const exports = {}
const umd = {
  ignoredFolders: ['useconfirm', 'usedialog', 'usetoast', 'usestyle'],
  exports: [],
}

fs.readdirSync(path.resolve(__root, INPUT_DIR), { withFileTypes: true })
  .filter(dir => dir.isDirectory())
  .forEach(({ name: folderName }) => {
    const folderPath = path.resolve(__root, INPUT_DIR + folderName)

    console.log('folderPath', folderPath)

    fs.readdirSync(folderPath).forEach((file) => {
      const fileName = file.split(/(.vue)$|(.js)$/)[0]
      const name = fileName.toLowerCase()

      if (name === folderName) {
        const validUMDFolder = !umd.ignoredFolders.includes(folderName)

        exports[`./${folderName}`] = `./${INPUT_DIR}${folderName}/${file}`
        validUMDFolder
        && umd.exports.push(
          `
// ${fileName}
export * from './${folderName}/${file}';
export { default as ${fileName} } from './${folderName}/${file}';
`,
        )

        try {
          fs.readdirSync(`${folderPath}/style`).forEach((file) => {
            const subFileName = file.split(/(.js)$/)[0]
            const subName = subFileName.toLowerCase()

            if (subName === `${folderName}style`) {
              exports[`./${folderName}/style`] = `./${INPUT_DIR}${folderName}/style/${file}`
              validUMDFolder
              && umd.exports.push(
                `export * from './${folderName}/style/${file}';
export { default as ${subFileName} } from './${folderName}/style/${file}';
`,
              )
            }
          })
        }
        catch {}
      }
    })
  })
exports['./*'] = './*'

// package.json
// const pkgJson = JSON.parse(fs.readFileSync(pkg, { encoding: 'utf8', flag: 'r' }))

// pkgJson.exports = exports

// fs.writeFileSync(pkg, JSON.stringify(pkgJson, null, 2))

// UMD
fs.writeFileSync(`${INPUT_DIR}lens.ts`, umd.exports.join(''))
