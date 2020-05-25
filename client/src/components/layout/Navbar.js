import React from 'react'

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
            <a href='collapsible.html'>Login</a>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
