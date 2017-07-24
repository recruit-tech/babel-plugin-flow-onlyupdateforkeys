import * as t from 'babel-types'

export default class ImportRegistry {
  constructor(packageName, moduleNames) {
    this.packageName = packageName
    this.moduleNames = moduleNames
    this.directModuleNames = moduleNames.map((moduleName) => `${packageName}/${moduleName}`)
    this.identifiers = []
  }

  clear() {
    this.identifiers = []
  }

  scan(path) {
    const source = path.node.source.value
    if (source === this.packageName) {
      return void path.node.specifiers.forEach((spec) => this.scanNormalImport(spec))
    }
    if (this.directModuleNames.includes(source)) {
      return void path.node.specifiers.forEach((spec) => this.scanDirectImport(spec))
    }
  }

  scanNormalImport(spec) {
    const pushAllModuleNames = () => this.moduleNames.forEach((moduleName) => {
      this.identifiers.push(`${spec.local.name}.${moduleName}`)
    })

    if (t.isImportDefaultSpecifier(spec)) {
      pushAllModuleNames()
    } else if (t.isImportSpecifier(spec)) {
      if (this.moduleNames.includes(spec.imported.name)) {
        this.identifiers.push(spec.local.name)
      } else if (spec.imported.name === 'default') {
        pushAllModuleNames()
      }
    }
  }

  scanDirectImport(spec) {
    if (t.isImportDefaultSpecifier(spec)) {
      this.identifiers.push(spec.local.name)
    } else if (t.isImportSpecifier(spec)) {
      this.identifiers.push(spec.local.name)
    }
  }

  match(node) {
    if (t.isIdentifier(node)) {
      return this.identifiers.includes(node.name)
    }

    if (!t.isMemberExpression(node) || node.computed) {
      return false
    }

    const { object, property } = node
    if (!t.isIdentifier(object) || !t.isIdentifier(property)) {
      return false
    }

    const memberExp = `${object.name}.${property.name}`
    return this.identifiers.includes(memberExp)
  }
}
