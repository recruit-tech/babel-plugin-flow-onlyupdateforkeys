// @flow
/* eslint-disable no-unused-vars */
import React from 'react'
import { compose, onlyUpdateForKeys } from 'recompose'

function outer() {
  function Foo(props: { foo: string, bar: number }) {
    const { foo, bar } = props
    return (
      <div>{foo}-{bar}</div>
    )
  }

  function inner() {
    const Bar = compose(
      onlyUpdateForKeys(),
    )(Foo)
  }
}
