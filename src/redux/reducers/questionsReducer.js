import {SET_LOADING_QUESTIONS, SET_QUESTIONS} from '../types';


const defaultState = {
  isLoading: false,
  questions: [],
  currentQuestion: {},
  answeredQuestions: []
}

let questionsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_LOADING_QUESTIONS:
      return {
        ...state,
        isLoading: true
      }
    case SET_QUESTIONS: {
      return {
        ...state,
        questions: action.payload,
        isLoading: false
      }
    }
    default:
      return state
  }
}

export default questionsReducer