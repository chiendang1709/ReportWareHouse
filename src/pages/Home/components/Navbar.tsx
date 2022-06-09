import React from 'react'

const Navbar = () => {
  return (
    <nav className='navbar'>
          <ul>
            <li className='navbar__item'>
                <a href="/" className="navbar__link"> Home </a>
            </li>
            <li className='navbar__item'>
            <a href="/report" className="navbar__link"> Report </a>
            </li>
          </ul>
    </nav>
  )
}

export default Navbar