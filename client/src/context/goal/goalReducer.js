import {
  GET_GOAL,
  DONE_GOAL,
  GET_GOAL_AVATAR,
  GET_GOAL_CROPPED_AVATAR,
  DELETE_GOAL_AVATAR,
  DELETE_GOAL_CROPPED_AVATAR
} from '../types'

export default (state, action) => {
  switch (action.type) {
    case GET_GOAL:
      return {
        ...state,
        goal: action.payload.goal,
        parent: action.payload.parent,
        children: action.payload.children,
        loading: false
      }
    case DONE_GOAL:
      return {
        ...state,
        goal: action.payload
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
