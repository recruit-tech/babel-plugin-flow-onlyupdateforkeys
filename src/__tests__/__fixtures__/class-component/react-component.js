// @flow
import React, { Component } from 'react'
import { compose, onlyUpdateForKeys } from 'recompose'

export default compose(
  onlyUpdateForKeys(),
)(class Foo extends Component {
  props: { foo: string, bar: number }

  render() {
    const { foo, bar } = this.props
    return (
      <div>{foo}-{bar}</div>
    )
  }
})
