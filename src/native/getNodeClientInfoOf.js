const r = require("ramda")
const ra = require("ramda-adjunct")

const execCommand = require("./internal/execCommand")
const isFile = require("./isFile")
const getSubDirsOf = require("./getSubDirsOf")

module.exports = async function(command) {
  try {
    const basicInfo = await getBasicInfo(command)
    if (r.isEmpty(basicInfo)) return basicInfo

    const libraries = await getLibraries(command)
    const [scoped, plain] = r.partition(r.startsWith("@"), libraries)
    const { root } = basicInfo
    const getScopedSubDirsIfNeeded = r.isEmpty(scoped)
      ? r.always([])
      : getScopedSubDirs

    const pkgs = await getScopedSubDirsIfNeeded(root, scoped)
    const allPkgs = r.concat(pkgs, plain)
    const purePkgs = await rejectFiles(root, allPkgs)

    return {
      ...basicInfo,
      name: command,
      pkgs: purePkgs,
    }
  } catch (e) {
    return {}
  }
}

function getRootDirDirectiveOf(command) {
  const directives = {
    yarn: "yarn global dir",
    npm: "npm root -g",
  }

  return directives[command]
}

async function getBasicInfo(command) {
  try {
    const rootDirDirective = getRootDirDirectiveOf(command)
    const [path, version, root] = await Promise.all([
      execCommand(`which ${command}`),
      execCommand(`${command} --version`),
      execCommand(rootDirDirective),
    ])
    return { path, version, root }
  } catch (e) {
    return {}
  }
}

async function getLibraries(command) {
  try {
    const rootDirDirective = getRootDirDirectiveOf(command)
    const libraries = await execCommand(`ls $(${rootDirDirective})`)

    return r.pipe(
      r.split("\n"),
      ra.compact,
    )(libraries)
  } catch (e) {
    return []
  }
}

async function getScopedSubDirs(parent, pkgs) {
  const subDirs = await r.pipe(
    r.map(r.concat(`${parent}/`)),
    r.map(getSubDirsOf),
    subDirs => Promise.all(subDirs),
  )(pkgs)

  const zipped = r.zipWith((parent, subDirs) =>
    r.map(r.concat(`${parent}/`))(subDirs),
  )(pkgs, subDirs)

  return r.flatten(zipped)
}

async function rejectFiles(parent, pkgs) {
  const result = []

  for await (let pkg of pkgs) {
    if (await isFile(`${parent}/${pkg}`)) {
      continue
    }

    result.push(pkg)
  }
  return result
}
