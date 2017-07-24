// @flow
import React from 'react'
import { compose, onlyUpdateForKeys } from 'recompose'

type propsType = { foo: string, bar: number }

export default compose(
  onlyUpdateForKeys(),
)(function Foo(props: propsType) {
  const { foo, bar } = props
  return (
    <div>{foo}-{bar}</div>
  )
})
