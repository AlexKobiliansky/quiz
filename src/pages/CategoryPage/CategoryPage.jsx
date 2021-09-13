import React, {useLayoutEffect, useState} from 'react';

import {Button, Typography, withStyles, makeStyles} from '@material-ui/core';
import {purple} from '@material-ui/core/colors';
import ProgressBar from "@ramonak/react-progress-bar";

import QuestionBlock from '../../components/QuestionBlock/QuestionBlock';
import TitleSeparator from '../../components/UI/TitleSeparator/TitleSeparator';
import styles from './CategoryPage.module.sass'
import {useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {setCurrentCategoryAC} from '../../redux/actions/category';
import {fetchQuestionsAC} from '../../redux/actions/questions';
import Timer from '../../components/Timer/Timer';
import NavigationBlock from '../../components/NavigationBlock/NavigationBlock';

function CategoryPage() {
  const dispatch = useDispatch();
  const {currentCategory, isLoading} = useSelector(({category}) => category);
  const categoryId = Number(useParams().id);
  const [inProcess, setInProcess] = useState(false);

  console.log('updated');

  useLayoutEffect(() => {
    if (currentCategory?.id !== categoryId) {
      dispatch(setCurrentCategoryAC(categoryId));
      dispatch(fetchQuestionsAC(categoryId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startQuiz = () => {
    setInProcess(true)
  }

  const endQuiz = () => {
    setInProcess(false)
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
        <TitleSeparator title="Question 1"/>

        <Timer status={inProcess}/>

        <div className={styles.questionsLine}>
          Question <b>1</b> of 10
        </div>

        <QuestionBlock/>

        <NavigationBlock
          status={inProcess}
          startQuiz={startQuiz}
          endQuiz={endQuiz}
        />

      </div>
    </div>
  );
}

export default React.memo(CategoryPage);