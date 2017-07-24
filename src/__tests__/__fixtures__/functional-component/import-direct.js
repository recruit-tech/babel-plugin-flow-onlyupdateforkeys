// @flow
import React from 'react'
import compose from 'recompose/compose'
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys'

export default compose(
  onlyUpdateForKeys(),
)(function Foo(props: { foo: string, bar: number }) {
  const { foo, bar } = props
  return (
    <div>{foo}-{bar}</div>
  )
})
