import {SET_CURRENT_QUESTION, SET_LOADING_QUESTIONS, SET_QUESTIONS, SUBMIT_ANSWER_ON_QUESTION} from '../types';


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
    case SET_QUESTIONS:
      return {
        ...state,
        questions: action.payload,
        isLoading: false
      }
    case SET_CURRENT_QUESTION:
      return {
        ...state,
        currentQuestion: action.payload
      }
    case SUBMIT_ANSWER_ON_QUESTION:
      return {
        ...state,
        questions: state.questions.filter(item => item.id !== action.payload.id),
        answeredQuestions: [
          ...state.answeredQuestions,
          action.payload
        ]
      }
    default:
      return state
  }
}

export default questionsReducer