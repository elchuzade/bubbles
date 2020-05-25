import {
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS
} from '../types'

export default (state, action) => {
  switch (action.type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        loading: false
      }
    case SIGNUP_SUCCESS:
    case LOGIN_SUCCESS:
      console.log('test')
      localStorage.setItem('token', action.payload.token)
      console.log(action.payload)
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false
      }
    case SIGNUP_FAIL:
    case LOGIN_FAIL:
    case AUTH_ERROR:
    case LOGOUT:
      localStorage.removeItem('token')
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: action.payload
      }
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null
      }
    default:
      return state
  }
}
