import {SET_LOADING_CATEGORY, SET_CATEGORIES} from '../types';

const defaultState = {
  isLoading: false,
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
    default:
      return state
  }
}

export default categoryReducer