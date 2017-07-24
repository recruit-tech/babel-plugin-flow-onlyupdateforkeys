// @flow
/* eslint-disable react/no-multi-comp */
import React, { Component, PureComponent } from 'react'
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

export const Bar = compose(
  onlyUpdateForKeys(),
)(class Bar extends PureComponent {
  props: { firstName: string, lastName: string, age: number }

  render() {
    const { firstName, lastName, age } = this.props
    return (
      <div>{firstName}-{lastName}({age})</div>
    )
  }
})
