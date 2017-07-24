// @flow
import React, { Component } from 'react'
import { compose, onlyUpdateForKeys } from 'recompose'

const Foo = class extends Component {
  props: { foo: string, bar: number }

  render() {
    const { foo, bar } = this.props
    return (
      <div>{foo}-{bar}</div>
    )
  }
}

export default compose(
  onlyUpdateForKeys(),
)(Foo)
