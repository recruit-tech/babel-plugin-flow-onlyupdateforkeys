import ImportRegistry from './ImportRegistry'
import FlowTypeRegistry from './FlowTypeRegistry'

const KEY_MANIPULATION_TARGET = 'flow-onlyUpdateForKeys/manipulation-target'

export default function plugin({ types: t }) {
  const componentRegistry = new ImportRegistry('react', ['Component', 'PureComponent'])
  const composeRegistry = new ImportRegistry('recompose', ['compose'])
  const onlyUpdateForKeysRegistry = new ImportRegistry('recompose', ['onlyUpdateForKeys'])
  const flowTypeRegistry = new FlowTypeRegistry()

  return {
    visitor: {
      Program(path, { opts }) {
        componentRegistry.clear()
        composeRegistry.clear()
        onlyUpdateForKeysRegistry.clear()
        flowTypeRegistry.clear()
      },

      ImportDeclaration(path) {
        componentRegistry.scan(path)
        composeRegistry.scan(path)
        onlyUpdateForKeysRegistry.scan(path)
      },

      TypeAlias(path) {
        flowTypeRegistry.scan(path)
      },

      CallExpression: {
        enter(path) {
          if (isManipulationTarget(path)) {
            const keys = getKeys(path)
            if (keys) {
              path.setData(KEY_MANIPULATION_TARGET, keys)
            }
          }
        },

        exit(path) {
          const keys = path.getData(KEY_MANIPULATION_TARGET)
          if (keys) {
            path.pushContainer('arguments', [
              t.arrayExpression(keys.map((key) => t.stringLiteral(key))),
            ])
          }
        },
      },
    },
  }

  function isManipulationTarget(path) {
    return onlyUpdateForKeysRegistry.match(path.node.callee) && path.node.arguments.length === 0
  }

  function getKeys(path) {
    const maybeCallCompose = path.findParent((parentPath) => t.isCallExpression(parentPath.node))
    if (!maybeCallCompose) {
      return null
    }

    if (!composeRegistry.match(maybeCallCompose.node.callee)) {
      return null
    }

    const maybeCallComposedFunction = maybeCallCompose.parentPath
    if (!t.isCallExpression(maybeCallComposedFunction.node)) {
      return null
    }

    const maybeComponent = maybeCallComposedFunction.node.arguments[0]
    if (t.isClassExpression(maybeComponent)) {
      return getKeysFromClassComponent(maybeComponent)
    }
    if (t.isFunctionExpression(maybeComponent) || t.isArrowFunctionExpression(maybeComponent)) {
      return getKeysFromFunctionalComponent(maybeComponent)
    }

    if (t.isIdentifier(maybeComponent)) {
      const referencedComponent =
        findReferencedComponent(maybeCallComposedFunction.scope, maybeComponent.name)
      if (!referencedComponent) {
        return null
      }

      if (t.isClassDeclaration(referencedComponent) || t.isClassExpression(referencedComponent)) {
        return getKeysFromClassComponent(referencedComponent)
      }
      if (t.isFunctionDeclaration(referencedComponent) ||
        t.isFunctionExpression(referencedComponent) ||
        t.isArrowFunctionExpression(referencedComponent)) {
        return getKeysFromFunctionalComponent(referencedComponent)
      }
    }

    return null
  }

  function findReferencedComponent(initialScope, name) {
    let scope = initialScope
    while (scope) {
      if (scope.bindings[name]) {
        const referencedComponent = scope.bindings[name].path.node
        if (t.isVariableDeclarator(referencedComponent)) {
          return referencedComponent.init
        }
        return referencedComponent
      }
      scope = scope.parent
    }
    return null
  }

  function getKeysFromClassComponent(component) {
    const superClass = component.superClass
    if (!componentRegistry.match(superClass)) {
      return null
    }

    const props = component.body.body.find((member) =>
      t.isClassProperty(member) && t.isIdentifier(member.key) && member.key.name === 'props'
    )
    if (!props) {
      return null
    }

    return getKeysFromTypeAnnotation(props.typeAnnotation)
  }

  function getKeysFromFunctionalComponent(component) {
    if (component.params.length !== 1) {
      return null
    }

    const props = component.params[0]
    if (!t.isIdentifier(props)) {
      return null
    }

    return getKeysFromTypeAnnotation(props.typeAnnotation)
  }

  function getKeysFromTypeAnnotation(typeAnnotation) {
    if (!t.isTypeAnnotation(typeAnnotation)) {
      return null
    }

    if (t.isObjectTypeAnnotation(typeAnnotation.typeAnnotation)) {
      const propsType = typeAnnotation.typeAnnotation
      return propsType.properties.map((prop) => prop.key.name)
    }

    if (t.isGenericTypeAnnotation(typeAnnotation.typeAnnotation)) {
      const typeReference = typeAnnotation.typeAnnotation
      const propsType = flowTypeRegistry.getType(typeReference.id.name)
      if (!propsType) {
        return null
      }
      return propsType.properties.map((prop) => prop.key.name)
    }

    return null
  }
}
