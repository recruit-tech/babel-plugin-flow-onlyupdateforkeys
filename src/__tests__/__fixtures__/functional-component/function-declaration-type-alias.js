// @flow
import React from 'react'
import { compose, onlyUpdateForKeys } from 'recompose'

type propsType = { foo: string, bar: number }

function Foo(props: propsType) {
  const { foo, bar } = props
  return (
    <div>{foo}-{bar}</div>
  )
}

export default compose(
  onlyUpdateForKeys(),
)(Foo)
