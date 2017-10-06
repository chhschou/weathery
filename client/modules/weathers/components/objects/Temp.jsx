import React from 'react'

export default function ({ isCelsius, c, f }) {
  const temp = isCelsius ? { value: c, unit: '°C' } : { value: f, unit: '°F' }
  return (
    <div className='o-temp'>
      <span>{temp.value}</span>
      <span>{temp.unit}</span>
    </div>
  )
}