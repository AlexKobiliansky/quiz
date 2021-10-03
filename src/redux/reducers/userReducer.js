import {SET_LOADING_USER, SET_USER, SET_CURRENT_USER, LOGOUT} from "../types";

const defaultState = {
  isLoading: false,
  user: null,
  currentUser: null,
  isAuth: false
}

export default function userReducer (state=defaultState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
        isAuth: true,
        isLoading: false
      }
    case SET_USER:
      return {
        ...state,
        user: action.payload,
        isLoading: false
      }
    case LOGOUT:
      return {
        ...state,
        currentUser: null,
        isAuth: false
      }
    case SET_LOADING_USER:
      return {
        ...state,
        isLoading: action.payload,
      }
    default:
      return state
  }
}