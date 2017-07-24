// @flow
import React from 'react'
import { compose, onlyUpdateForKeys } from 'recompose'

export default compose(
  onlyUpdateForKeys(),
)(function Foo(props: { foo: string, bar: number }) {
  const { foo, bar } = props
  return (
    <div>{foo}-{bar}</div>
  )
})

export const Bar = compose(
  onlyUpdateForKeys(),
)(function Bar(props: { firstName: string, lastName: string, age: number }) {
  const { firstName, lastName, age } = props
  return (
    <div>
      <span>{firstName}</span>
      <span>{lastName}</span>
      <span>{age}</span>
    </div>
  )
})
