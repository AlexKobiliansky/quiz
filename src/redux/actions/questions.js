import {questionsAPI} from '../../api/questionsAPI';
import {SET_QUESTIONS, SET_LOADING_QUESTIONS} from '../types';

export const fetchQuestionsAC = () => async dispatch  => {
  try {
    dispatch(setLoading(true));
    const {data} = await questionsAPI.getQuestions();
    dispatch(fetchQuestions(data));
  } catch(e) {
    alert(`Ошибка при загрузке вопросов: ${e.message}`)
  }
};

//actions
const setLoading = loading => ({type: SET_LOADING_QUESTIONS, payload: loading});
const fetchQuestions = questions => ({type: SET_QUESTIONS, payload: questions});