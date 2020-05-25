import React, { Fragment } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import setAuthToken from './utils/setAuthToken'
import PrivateRoute from './components/routing/PrivateRoute'

import AuthState from './context/auth/AuthState'
import AlertState from './context/alert/AlertState'

import Signup from './components/auth/Signup'
import Login from './components/auth/Login'

if (localStorage.token) {
  setAuthToken(localStorage.token)
}

const App = () => {
  return (
    <AlertState>
      <AuthState>
        <Router>
          <Fragment>
            <Switch>
              <Route exact path='/signup' component={Signup} />
              <Route exact path='/login' component={Login} />
            </Switch>
          </Fragment>
        </Router>
      </AuthState>
    </AlertState>
  )
}

export default App
