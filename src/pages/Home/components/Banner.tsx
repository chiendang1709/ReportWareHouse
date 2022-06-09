import React from 'react'
import logo from '../../../assets/images/logo.png'

const Banner = () => {
  return (  
    <div className='banner'>
          <div className="banner__content">
                  <img src={logo} alt="rpwh logo" />
                  <h1>
                       Design report for you
                  </h1>
          </div>

    </div>
  )
}

export default Banner