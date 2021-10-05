import {SET_LOADING_USER, SET_USER, SET_CURRENT_USER, LOGOUT, UPDATE_USER, UPDATE_CURRENT_USER} from "../types";

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
    case UPDATE_USER:
      return {
        ...state,
        user: {
          ...state.user,
          [Object.keys(action.payload)[0]]: Object.values(action.payload)[0]
        },
      }
    case UPDATE_CURRENT_USER:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          [Object.keys(action.payload)[0]]: Object.values(action.payload)[0]
        },
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