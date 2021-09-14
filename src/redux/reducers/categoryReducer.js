import {SET_LOADING_CATEGORY, SET_CATEGORIES, SET_CURRENT_CATEGORY, SET_IN_PROCESS} from '../types';

const defaultState = {
  isLoading: false,
  inProcess: false,
  categories: [],
  currentCategory: {}
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
    default:
      return state
  }
}

export default categoryReducer