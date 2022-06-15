import React from 'react'
import logo from 'assets/images/logo.png'
import bg from 'assets/images/background.jpg'

const Banner = () => {
  return (  
    // ở đây local với host đều nhận
    <div className='banner' style={{backgroundImage:`url(${bg})`}}>
          <div className="banner__content" >
                  <img src={logo} alt="rpwh logo" />
                  <h1>
                       Design report for you
                  </h1>
          </div>

    </div>
  )
}

export default Banner