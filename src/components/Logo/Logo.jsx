import React from 'react'
import './Logo.css'

function Logo({color, circle}) {
  return (
    <div className='logo'>
      {circle ? <div className={`logo__circle`} /> : '' }
      <h1 className='logo__title'>
        <span className={`logo__title logo__title--${color}`}>P</span>
        ro
        <span className={`logo__title logo__title--${color}`}>F</span>
        it
      </h1>
    </div>
  )
}

export default Logo
