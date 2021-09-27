import React from 'react';
import {useSelector} from 'react-redux';
import ProgressBar from '@ramonak/react-progress-bar';
//material-ui
import {Typography} from '@material-ui/core';
//components
import ComparedAnswers from '../../components/ComparedAnswers/ComparedAnswers';
import TitleSeparator from '../../components/UI/TitleSeparator/TitleSeparator';
//styles
import styles from './ResultsPage.module.sass';
import {currentCategorySelector, timerSelector} from '../../redux/selectors/categorySelectors';
import {
  correctAnswersSelector,
  questionsSelector
} from '../../redux/selectors/questionsSelectors';

const ResultsPage = () => {
  const currentCategory = useSelector(currentCategorySelector);
  const timer = useSelector(timerSelector);
  const questions = useSelector(questionsSelector);
  let correctAnswers = useSelector(correctAnswersSelector);

  let progress = Math.ceil(correctAnswers/questions?.length*100);

  return (
    <div className="container">
      <Typography
        align="center"
        variant="h1"
      >Results
      </Typography>

      <Typography
        align="center"
        variant="h2"
        gutterBottom
      >Category: <b>{currentCategory.title}</b>
      </Typography>

      <Typography
        align="center"
        variant="h4"
        gutterBottom
      >Suspended time: {(timer.h >= 10) ? timer.h : '0'+timer.h}:
        {(timer.m >= 10) ? timer.m : '0'+timer.m}:
        {(timer.s >= 10) ? timer.s : '0'+timer.s}
      </Typography>

      <div className={styles.results}>
        <Typography
          align="center"
          variant="body1"
          gutterBottom
        >
        Total questions: {questions?.length}
        </Typography>

        <Typography
          align="center"
          variant="body1"
          gutterBottom
        >
          Correct answers: {correctAnswers}
        </Typography>

        <ProgressBar
          bgColor='#3f51b5'
          borderRadius='0'
          completed={progress}
          labelAlignment='outside'
          labelColor='#000'
          className={styles.progress}
        />
      </div>

      <TitleSeparator title="Answers"/>

      {questions.map((question, index) => {
        return <ComparedAnswers
          question={question}
          key={question.id}
          index={index+1}
        />
      })}
    </div>
  );
};

export default ResultsPage;