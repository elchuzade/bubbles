import {
  GET_ALL_GOALS,
  GET_GOAL,
  DONE_GOAL,
  ADD_GOAL,
  UPDATE_GOAL,
  GOAL_ERROR,
  MOVE_GOALS,
  GET_GOAL_AVATAR,
  GET_GOAL_CROPPED_AVATAR,
  DELETE_GOAL_AVATAR,
  DELETE_GOAL_CROPPED_AVATAR
} from '../types'

export default (state, action) => {
  switch (action.type) {
    case MOVE_GOALS:
      return {
        ...state,
        goal: action.payload
      }
    case GET_ALL_GOALS:
      return {
        ...state,
        allGoals: action.payload
      }
    case GET_GOAL:
      return {
        ...state,
        goal: action.payload,
        loading: false
      }
    case ADD_GOAL:
      return {
        ...state,
        goal: action.payload,
      }
    case UPDATE_GOAL:
      return {
        ...state,
        goal: action.payload.goal
      }
    case DONE_GOAL:
      return {
        ...state,
        goal: action.payload
      }
    case GOAL_ERROR:
      return {
        ...state,
        error: action.payload
      }
    case GET_GOAL_AVATAR:
      return {
        ...state,
        goal: { ...state.goal, avatar: action.payload },
        avatarUploadLoading: false
      }
    case GET_GOAL_CROPPED_AVATAR:
      return {
        ...state,
        goal: { ...state.goal, croppedAvatar: action.payload },
        avatarUploadLoading: false
      }
    case DELETE_GOAL_AVATAR:
    case DELETE_GOAL_CROPPED_AVATAR:
      return {
        ...state,
        goal: action.payload,
        deleteUploadLoading: false
      }
    default:
      return state
  }
}
