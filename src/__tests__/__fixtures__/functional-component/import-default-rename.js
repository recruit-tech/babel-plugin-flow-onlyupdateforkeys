// @flow
import React from 'react'
import { default as recompose } from 'recompose' // eslint-disable-line import/no-named-default

export default recompose.compose(
  recompose.onlyUpdateForKeys(),
)(function Foo(props: { foo: string, bar: number }) {
  const { foo, bar } = props
  return (
    <div>{foo}-{bar}</div>
  )
})
