// @flow
import React from 'react'
import recompose from 'recompose'

export default recompose.compose(
  recompose.onlyUpdateForKeys(),
)(function Foo(props: { foo: string, bar: number }) {
  const { foo, bar } = props
  return (
    <div>{foo}-{bar}</div>
  )
})
