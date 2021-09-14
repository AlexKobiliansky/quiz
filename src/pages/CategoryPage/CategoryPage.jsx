import React, {useEffect, useLayoutEffect, useState} from 'react';

import {Typography} from '@material-ui/core';

import QuestionBlock from '../../components/QuestionBlock/QuestionBlock';
import TitleSeparator from '../../components/UI/TitleSeparator/TitleSeparator';
import styles from './CategoryPage.module.sass'
import {useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {setCurrentCategoryAC} from '../../redux/actions/category';
import {fetchQuestionsAC, setCurrentQuestion, submitAnswer} from '../../redux/actions/questions';
import Timer from '../../components/Timer/Timer';
import NavigationBlock from '../../components/NavigationBlock/NavigationBlock';

function CategoryPage() {
  const dispatch = useDispatch();
  const {currentCategory, isLoading} = useSelector(({category}) => category);
  const categoryId = Number(useParams().id);
  const [inProcess, setInProcess] = useState(false);
  const [questionNumber, setQuestionNumber] = useState(1);
  const {questions, unansweredQuestions, currentQuestion} = useSelector(({questions}) => questions);

  const index = questions.findIndex(item => item.id === currentQuestion?.id);

  useLayoutEffect(() => {
    if (currentCategory?.id !== categoryId) {
      dispatch(setCurrentCategoryAC(categoryId));
      dispatch(fetchQuestionsAC(categoryId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    questions.length && dispatch(setCurrentQuestion(unansweredQuestions[questionNumber-1]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionNumber])

  const startQuiz = () => {
    setInProcess(true)
    dispatch(setCurrentQuestion(unansweredQuestions[questionNumber-1]))
  }

  const endQuiz = () => {
    setInProcess(false)
  }

  const nextQuestion = () => {
    if (questionNumber < unansweredQuestions.length) {
      setQuestionNumber(questionNumber + 1);
    }
  }

  const prevQuestion = () => {
    if (questionNumber > 1) {
      setQuestionNumber(questionNumber - 1);
    }
  }

  const onSubmitAnswer = () => {
    if (unansweredQuestions.length === 1) {
      alert('Quiz done!');
    }

    dispatch(submitAnswer(currentQuestion));
  }

  return (
    <div>
      <Typography
        align="center"
        component="h1"
        gutterBottom
        variant="h2"
      >
        Category: {!isLoading ? <b>{currentCategory.title}</b> : 'Идет загрузка'}
      </Typography>

      <div className={styles.quizWindow}>
        <TitleSeparator title={`Question ${index+1}`}/>

        <Timer status={inProcess}/>

        <div className={styles.questionsLine}>
          Question <b>{index + 1} </b> of {questions?.length}
        </div>

        <QuestionBlock currentQuestion={currentQuestion}/>

        <NavigationBlock
          status={inProcess}
          startQuiz={startQuiz}
          endQuiz={endQuiz}
          nextQuestion={nextQuestion}
          prevQuestion={prevQuestion}
          onSubmitAnswer={onSubmitAnswer}
        />

      </div>
    </div>
  );
}

export default React.memo(CategoryPage);