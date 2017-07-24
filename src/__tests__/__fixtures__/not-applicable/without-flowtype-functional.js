import React from 'react'
import { compose, onlyUpdateForKeys } from 'recompose'

export default compose(
  onlyUpdateForKeys(),
)(function Foo(props) {
  const { foo, bar } = props
  return (
    <div>{foo}-{bar}</div>
  )
})
