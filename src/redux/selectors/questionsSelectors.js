import {createSelector} from 'reselect';
import {countAnswers} from '../../utils/countAnswers';

export const questionsSelector = state => state.questions.questions;
export const currentQuestionSelector = state => state.questions.currentQuestion;
export const answeredQuestionsSelector = state => state.questions.answeredQuestions;

export const correctAnswersSelector = createSelector(
  questionsSelector,
  answeredQuestionsSelector,
  (questions, answeredQuestions) => countAnswers(questions, answeredQuestions)
);