import React, { Fragment, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import './assets/styles/App.scss'

import setAuthToken from './utils/setAuthToken'
import PrivateRoute from './components/routing/PrivateRoute'

import AuthState from './context/auth/AuthState'
import AlertState from './context/alert/AlertState'
import GoalState from './context/goal/GoalState'
import NoteState from './context/note/NoteState'

import NotFound from './components/layout/NotFound'
import Navbar from './components/layout/Navbar'

import Signup from './pages/auth/Signup'
import Login from './pages/auth/Login'
import Goal from './pages/goal/Goal'
import BubblesPage from './pages/bubble/BubblesPage'

if (localStorage.token) {
  setAuthToken(localStorage.token)
}

const App = () => {
  return (
    <AlertState>
      <AuthState>
        <GoalState>
          <NoteState>
            <Router>
              <Fragment>
                <Navbar />
                <Switch>
                  <Route exact path='/bubbles/:id' component={BubblesPage} />
                  <Route exact path='/signup' component={Signup} />
                  <Route exact path='/login' component={Login} />
                  <PrivateRoute exact path='/goals/:id' component={Goal} />
                  <Route path='*' component={NotFound} />
                </Switch>
              </Fragment>
            </Router>
          </NoteState>
        </GoalState>
      </AuthState>
    </AlertState>
  )
}

export default App
