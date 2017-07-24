// @flow
import React, { Component } from 'react'
import { compose, onlyUpdateForKeys } from 'recompose'

type propsType = { foo: string, bar: number }

export default compose(
  onlyUpdateForKeys(),
)(class Foo extends Component {
  props: propsType

  render() {
    const { foo, bar } = this.props
    return (
      <div>{foo}-{bar}</div>
    )
  }
})
