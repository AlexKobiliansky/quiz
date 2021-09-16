import {SET_LOADING_CATEGORY, SET_CATEGORIES, SET_CURRENT_CATEGORY, SET_IN_PROCESS, UPDATE_TIME} from '../types';

const defaultState = {
  isLoading: false,
  inProcess: false,
  categories: [],
  currentCategory: {},
  timer: {s:0, m:0, h:0}
}

let categoryReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_LOADING_CATEGORY:
      return {
        ...state,
        isLoading: true
      }
    case SET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
        isLoading: false
      }
    case SET_CURRENT_CATEGORY:
      return {
        ...state,
        currentCategory: action.payload,
        isLoading: false
      }
    case SET_IN_PROCESS:
      return {
        ...state,
        inProcess: action.payload
      }
    case UPDATE_TIME:
      return {
        ...state,
        timer: action.payload
      }
    default:
      return state
  }
}

export default categoryReducer