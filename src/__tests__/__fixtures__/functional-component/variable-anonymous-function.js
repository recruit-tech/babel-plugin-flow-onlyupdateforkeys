// @flow
/* eslint-disable func-names */
import React from 'react'
import { compose, onlyUpdateForKeys } from 'recompose'

const Foo = function (props: { foo: string, bar: number }) {
  const { foo, bar } = props
  return (
    <div>{foo}-{bar}</div>
  )
}

export default compose(
  onlyUpdateForKeys(),
)(Foo)
