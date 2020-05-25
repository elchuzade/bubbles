import { GET_GOAL } from '../types'

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
    default:
      return state
  }
}
