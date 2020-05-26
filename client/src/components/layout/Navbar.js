import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav>
      <div className='nav-wrapper container'>
        <a href='#' className='brand-logo'>
          Goals
        </a>
        <ul id='nav-mobile' className='right hide-on-med-and-down'>
          <li>
            <a href='badges.html'>Main Goal</a>
          </li>
          <li>
            <Link to='/login1'>Login</Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
