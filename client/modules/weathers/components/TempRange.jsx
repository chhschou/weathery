import React from 'react'

import Temp from './objects/Temp'

export default function ({ isCelsius, range }) {
  const { highC, lowC, highF, lowF } = range
  return (
    <div className='c-temprange'>
      <Temp isCelsius={isCelsius} c={highC} f={highF} />
      <span> | </span>
      <Temp isCelsius={isCelsius} c={lowC} f={lowF} />
    </div>
  )
}