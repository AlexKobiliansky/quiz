import {questionsAPI} from '../../api/questionsAPI';
import {SET_QUESTIONS, SET_LOADING_QUESTIONS, SET_CURRENT_QUESTION, SUBMIT_ANSWER_ON_QUESTION} from '../types';

export const fetchQuestionsAC = (categoryId) => async dispatch  => {
  try {
    dispatch(setLoading(true));
    const {data} = await questionsAPI.getQuestions(categoryId);
    dispatch(fetchQuestions(data));
  } catch(e) {
    alert(`Ошибка при загрузке вопросов: ${e.message}`)
  }
};

export const setCurrentQuestion = question =>({type: SET_CURRENT_QUESTION, payload: question})
export const submitAnswer = question =>({type: SUBMIT_ANSWER_ON_QUESTION, payload: question})

//actions
const setLoading = loading => ({type: SET_LOADING_QUESTIONS, payload: loading});
const fetchQuestions = questions => ({type: SET_QUESTIONS, payload: questions});