import React from 'react';
import styles from './QuestionBlock.module.sass';
import TitleSeparator from '../UI/TitleSeparator/TitleSeparator';
import Timer from '../Timer/Timer';
import MultipleAnswers from '../MultipleAnswers/MultipleAnswers';
import SingleAnswers from '../SingleAnswers/SingleAnswers';
import {useSelector} from 'react-redux';
import {Skeleton} from '@material-ui/lab';
import {makeStyles} from '@material-ui/core';

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
          <div className={styles.variants}>
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

export default QuestionBlock;