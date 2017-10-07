import React from 'react'

import Temp from './objects/Temp'
import styles from './TempRange.css'

export default function ({ isRow, isCelsius, range }) {
  const { highC, lowC, highF, lowF } = range
  const classes = isRow ? 'c-temprange is-row' : 'c-temprange'
  return (
    <div className={classes}>
      <Temp isCelsius={isCelsius} c={highC} f={highF} />
      <Temp isCelsius={isCelsius} c={lowC} f={lowF} />
    </div>
  )
}