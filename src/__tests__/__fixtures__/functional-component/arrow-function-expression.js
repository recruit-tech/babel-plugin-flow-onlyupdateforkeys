// @flow
import React from 'react'
import { compose, onlyUpdateForKeys, setDisplayName } from 'recompose'

export default compose(
  onlyUpdateForKeys(),
  setDisplayName('Foo'),
)((props: { foo: string, bar: number }) => {
  const { foo, bar } = props
  return (
    <div>{foo}-{bar}</div>
  )
})
