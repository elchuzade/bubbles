import React, { useReducer } from 'react'
import axios from 'axios'
import GoalContext from './goalContext'
import goalReducer from './goalReducer'
import { GET_GOAL, GOAL_ERROR } from '../types'

const GoalState = props => {
  const initialState = {
    goal: {},
    parent: {},
    children: [],
    error: null,
    loading: false
  }

  const [state, dispatch] = useReducer(goalReducer, initialState)

  // Get Goal
  const getGoal = async id => {
    try {
      const res = await axios.get(`/api/goals/${id}`)

      dispatch({
        type: GET_GOAL,
        payload: {
          goal: res.data.goal,
          children: res.data.children,
          parent: res.data.parent
        }
      })
    } catch (err) {
      dispatch({ type: GOAL_ERROR })
    }
  }

  return (
    <GoalContext.Provider
      value={{
        goal: state.goal,
        parent: state.parent,
        children: state.children,
        error: state.error,
        loading: state.loading,
        getGoal
      }}
    >
      {props.children}
    </GoalContext.Provider>
  )
}

export default GoalState
