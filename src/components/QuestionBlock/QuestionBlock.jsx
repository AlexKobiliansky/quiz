import React from 'react';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
//material-ui
import {Skeleton} from '@material-ui/lab';
import {makeStyles} from '@material-ui/core';
//components
import TitleSeparator from '../UI/TitleSeparator/TitleSeparator';
import Timer from '../Timer/Timer';
import MultipleAnswers from '../MultipleAnswers/MultipleAnswers';
import SingleAnswers from '../SingleAnswers/SingleAnswers';
//styles
import styles from './QuestionBlock.module.sass';

const useStyles = makeStyles(() => ({
  skeleton: {
    margin: '50px 0 20px',
  }
}));

const QuestionBlock = ({userAnswers, setUserAnswers, radioValue, onRadioChange}) => {
  const classes = useStyles();
  const {questions, currentQuestion} = useSelector(({questions}) => questions);
  const {inProcess} = useSelector(({category}) => category);
  const index = questions.findIndex(item => item.id === currentQuestion?.id);

  const handleCheckBoxChange = e => {
    setUserAnswers({...userAnswers, [e.target.name]: e.target.checked});
  };

  let questionMarkup = <div className={styles.questionWrap}>
    {
      currentQuestion
        ? (<>
          <div className={styles.question}>{currentQuestion.question}</div>
          <div>
            {
              currentQuestion.multiple_correct_answers
                ? <MultipleAnswers
                  answers={currentQuestion.answers}
                  onChange={handleCheckBoxChange}
                  checkBoxValue={userAnswers}
                />
                : <SingleAnswers
                  answers={currentQuestion.answers}
                  onChange={onRadioChange}
                  radioValue={radioValue}
                />
            }
          </div>

        </>)
        : 'Вопросы закончились!'
    }
  </div>

  return <div className={styles.questionBlock}>
    <TitleSeparator title={`Question ${index + 1}`}/>

    <Timer />

    <div className={styles.questionsLine}>
      Question <b>{index + 1} </b> of {questions?.length}
    </div>

    {inProcess ? questionMarkup : <Skeleton variant="rect" width='100%' height={320} className={classes.skeleton}/>}
  </div>
};

QuestionBlock.propTypes = {
  userAnswers: PropTypes.object.isRequired,
  setUserAnswers: PropTypes.func.isRequired,
  radioValue: PropTypes.string,
  onRadioChange: PropTypes.func.isRequired
}

export default QuestionBlock;