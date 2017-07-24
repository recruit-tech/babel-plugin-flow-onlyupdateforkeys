// @flow
import React from 'react'
import { compose, pure } from 'recompose'

export default compose(
  pure,
)(function Foo(props: { foo: string, bar: number }) {
  const { foo, bar } = props
  return (
    <div>{foo}-{bar}</div>
  )
})
