// @flow
import React, { Component as Comp } from 'react'
import { compose, onlyUpdateForKeys } from 'recompose'

export default compose(
  onlyUpdateForKeys(),
)(class Foo extends Comp {
  props: { foo: string, bar: number }

  render() {
    const { foo, bar } = this.props
    return (
      <div>{foo}-{bar}</div>
    )
  }
})
