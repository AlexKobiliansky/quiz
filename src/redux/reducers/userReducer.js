import {SET_LOADING_USER, SET_USER, LOGOUT} from "../types";

const defaultState = {
  isLoading: false,
  currentUser: null,
  isAuth: false
}

export default function userReducer (state=defaultState, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        currentUser: action.payload,
        isAuth: true
      }
    case LOGOUT:
      return {
        ...state,
        currentUser: null,
        isAuth: false
      }
    default:
      return state
  }
}