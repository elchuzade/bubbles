import React, { useContext } from 'react'
import AuthContext from '../../context/auth/authContext'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const authContext = useContext(AuthContext)
  const { user } = authContext
  return (
    <nav>
      <div className='nav-wrapper container'>
        <a href='#' className='brand-logo'>
          Goals
        </a>
        <ul id='nav-mobile' className='right hide-on-med-and-down'>
          <li>{user && <Link to={`/goals/${user.goal}`}>Main Goal</Link>}</li>
          <li>
            <Link to='/login'>Login</Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
