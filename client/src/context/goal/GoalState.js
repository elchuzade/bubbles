import React, { useReducer } from 'react'
import axios from 'axios'
import GoalContext from './goalContext'
import goalReducer from './goalReducer'
import {
  GET_GOAL,
  GOAL_ERROR,
  DONE_GOAL,
  ADD_GOAL,
  GET_GOAL_AVATAR,
  GET_GOAL_CROPPED_AVATAR,
  DELETE_GOAL_AVATAR,
  DELETE_GOAL_CROPPED_AVATAR
} from '../types'

const GoalState = props => {
  const initialState = {
    goal: {},
    parent: {},
    children: [],
    error: null,
    loading: false,
    avatarUploadLoading: false,
    avatarDeleteLoading: false
  }

  const [state, dispatch] = useReducer(goalReducer, initialState)

  // Get Goal
  const getGoal = async id => {
    try {
      // Will return { goal, children, parent }
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

  // Done Goal
  const doneGoal = async id => {
    try {
      // Will return goal
      const res = await axios.post(`/api/goals/${id}/done`)

      dispatch({
        type: DONE_GOAL,
        payload: res.data
      })
    } catch (err) {
      dispatch({ type: GOAL_ERROR })
    }
  }

  // Add Goal
  const addGoal = async (id, goal) => {
    try {
      // Will return goal, children
      const res = await axios.post(`/api/goals/${id}`, goal)

      dispatch({
        type: ADD_GOAL,
        payload: {
          goal: res.data.goal,
          children: res.data.children
        }
      })
    } catch (err) {
      dispatch({ type: GOAL_ERROR })
    }
  }

  // Upload Goal Avatar
  const uploadGoalAvatar = async (id, formData, configData) => {
    try {
      // Will return { item: avatar }
      const res = await axios.post(
        `/api/goals/${id}/avatar`,
        formData,
        configData
      )

      dispatch({
        type: GET_GOAL_AVATAR,
        payload: res.data.item
      })
    } catch (err) {
      dispatch({ type: GOAL_ERROR })
    }
  }

  // Upload Goal Cropped Avatar
  const uploadGoalCroppedAvatar = async (id, formData, configData) => {
    try {
      // Will return { item: croppedAvatar }
      const res = await axios.post(
        `/api/goals/${id}/croppedAvatar`,
        formData,
        configData
      )

      dispatch({
        type: GET_GOAL_CROPPED_AVATAR,
        payload: res.data.item
      })
    } catch (err) {
      dispatch({ type: GOAL_ERROR })
    }
  }

  // Delete Goal Avatar
  const deleteGoalAvatar = async id => {
    try {
      // Will return { item: goal }
      const res = await axios.delete(`/api/goals/${id}/avatar`)

      dispatch({
        type: DELETE_GOAL_AVATAR,
        payload: res.data.item
      })
    } catch (err) {
      dispatch({ type: GOAL_ERROR })
    }
  }

  // Delete Goal Cropped Avatar
  const deleteGoalCroppedAvatar = async id => {
    try {
      // Will return { item: goal }
      const res = await axios.delete(`/api/goals/${id}/croppedAvatar`)

      dispatch({
        type: DELETE_GOAL_CROPPED_AVATAR,
        payload: res.data.item
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
        avatarUploadLoading: state.avatarUploadLoading,
        avatarDeleteLoading: state.avatarDeleteLoading,
        uploadGoalAvatar,
        deleteGoalAvatar,
        uploadGoalCroppedAvatar,
        deleteGoalCroppedAvatar,
        getGoal,
        doneGoal,
        addGoal
      }}
    >
      {props.children}
    </GoalContext.Provider>
  )
}

export default GoalState
