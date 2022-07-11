import React from 'react'
import logo from 'assets/images/logo.png'
import bg from 'assets/images/background.jpg'

const Banner = () => {
  return (  
    <div className='banner' style={{backgroundImage:`url(${bg})`}}>
          <div className="banner__content" >
                  <img src={logo} alt="rpwh logo" />                 
                  <a href='/report'>
                    <h1>
                        Design report for you
                    </h1>
                  </a>
          </div>

    </div>
  )
}

export default Banner