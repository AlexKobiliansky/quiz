import React, {useMemo} from 'react';
import {useSelector} from 'react-redux';
import PropTypes from 'prop-types';
//material-ui
import {green, red} from '@material-ui/core/colors';
//icons
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
//styles
import styles from './ComparedAnswers.module.sass';
import {compareAnswers} from '../../utils/compareAnswers';
import {answeredQuestionsSelector} from '../../redux/selectors/questionsSelectors';

const ComparedAnswers = ({question, index}) => {
  const answeredQuestions = useSelector(answeredQuestionsSelector);

  let userAnswer = answeredQuestions.find(item => item.id === question.id);
  let resultComparsion = useMemo(() => compareAnswers(question, userAnswer), [question, userAnswer]);

  let userAnswerMarkup = userAnswer && Object.keys(userAnswer.userAnswers).map((item, index) => {
    return <div className={styles.listItem} key={index}>
      {
        userAnswer.answers[item]
          ? <>
            {userAnswer.userAnswers[item]
              ? <CheckIcon style={{color: green[500]}}/>
              : <CloseIcon style={{color: red[500]}}/>}
            <span>{userAnswer.answers[item]}</span>
          </>
          : null
      }
    </div>
  });

  let correctAnswerMarkup = question && Object.keys(question.answers).map((item, index) => {
    return <div className={styles.listItem} key={index}>
      {
        question.answers[item]
          ? <>
            {question.correct_answers[item]
              ? <CheckIcon style={{color: green[500]}}/>
              : <CloseIcon style={{color: red[500]}}/>}
            <span>{question.answers[item]}</span>
          </>
          : null
      }
    </div>
  })

  return (
    <div className={styles.compareBlock}>
      <div className={styles.number}>Question №{index}</div>
      <div className={styles.title}>{question.question}</div>
      <div className={`${styles.compare} ` + (resultComparsion ? `${styles.correct}` : `${styles.wrong}`)}>
        <div>
          <h3>Given Answers</h3>
          {userAnswer
            ? userAnswerMarkup
            : <div className={styles.noAnswer}>Not answered</div>
          }

        </div>
        <div>
          <h3>Correct Answers</h3>
          {correctAnswerMarkup}
        </div>
      </div>
      <div className={`${styles.result} ` + (resultComparsion ? `${styles.correct}` : `${styles.wrong}`)}>
        {resultComparsion ? 'Correct' : 'Wrong'}
      </div>
    </div>
  );
};

ComparedAnswers.propTypes = {
  question: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired
}

export default ComparedAnswers;