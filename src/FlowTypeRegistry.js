import * as t from 'babel-types'

export default class FlowTypeRegistry {
  constructor() {
    this.typeAliases = {}
  }

  clear() {
    this.typeAliases = {}
  }

  scan(path) {
    const id = path.node.id
    if (t.isIdentifier(id)) {
      this.typeAliases[id.name] = path.node.right
    }
  }

  getType(typeRef) {
    return this.typeAliases[typeRef]
  }
}
