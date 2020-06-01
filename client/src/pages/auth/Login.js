import React, { useState, useContext, useEffect } from 'react'
import AlertContext from '../../context/alert/alertContext'
import AuthContext from '../../context/auth/authContext'

const Login = props => {
  const alertContext = useContext(AlertContext)
  const authContext = useContext(AuthContext)

  const { setAlert } = alertContext
  const { login, error, clearErrors, isAuthenticated, user, loadUser } = authContext

  // Load user if not loaded
  useEffect(() => {
    if (!user) {
      loadUser()
    }
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (error === 'Invalid Credentials') {
      setAlert(error, 'danger')
      clearErrors()
    }
    // eslint-disable-next-line
  }, [error, props.history])

  useEffect(() => {
    if (isAuthenticated && user) {
      props.history.push(`/goals/${user.goal}`)
    }
    // eslint-disable-next-line
  }, [isAuthenticated, user])

  const [logUser, setUser] = useState({
    email: '',
    password: ''
  })

  const { email, password } = logUser

  const onChange = e => setUser({ ...logUser, [e.target.name]: e.target.value })

  const onSubmit = e => {
    e.preventDefault()
    if (email === '' || password === '') {
      setAlert('Please enter all fields', 'danger')
    } else {
      login({ email, password })
    }
  }

  return (
    <div className='container'>
      <div className='row'>
        <div className='col s12 m8 offset-m2'>
          <div className='card'>
            <div className='card-content'>
              <span className='card-title'>Login</span>
              <form onSubmit={onSubmit}>
                <div className='form-group'>
                  <label htmlFor='email'>Email</label>
                  <input
                    type='email'
                    name='email'
                    value={email}
                    onChange={onChange}
                    required
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='password'>Password</label>
                  <input
                    type='password'
                    name='password'
                    value={password}
                    onChange={onChange}
                    required
                  />
                </div>
                <div>
                  <input
                    type='submit'
                    value='Login'
                    className='btn btn-primary btn-block'
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
