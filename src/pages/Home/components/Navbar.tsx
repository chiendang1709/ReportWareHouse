import React from 'react'

const Navbar = () => {
  return (
    <nav className='navbar'>
          <ul>
            <li className='navbar__item'>
                <a href="/" className="navbar__link">
                    <p className='navbar__text'>Home</p> 
                </a>
            </li>
            <li className='navbar__item'>
            <a href="/report" className="navbar__link"> 
                    <p className='navbar__text'>Report</p> 
             </a>
            </li>
          </ul>
    </nav>
  )
}

export default Navbar