// @flow
import React from 'react'
import { compose, onlyUpdateForKeys } from 'recompose'

const Foo = (props: { foo: string, bar: number }) => {
  const { foo, bar } = props
  return (
    <div>{foo}-{bar}</div>
  )
}

export default compose(
  onlyUpdateForKeys(),
)(Foo)
