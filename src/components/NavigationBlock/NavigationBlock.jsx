import React, {useEffect, useLayoutEffect, useState} from 'react';
import styles from '../../pages/CategoryPage/CategoryPage.module.sass';
import {Button, makeStyles, withStyles} from '@material-ui/core';
import ProgressBar from '@ramonak/react-progress-bar';
import {purple} from '@material-ui/core/colors';
import {setCurrentCategoryAC, setInProcess} from '../../redux/actions/category';
import {fetchQuestionsAC, setCurrentQuestion, submitAnswer} from '../../redux/actions/questions';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';

const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    '&:hover': {
      backgroundColor: purple[700],
    },
  },
}))(Button);

const useStyles = makeStyles(() => ({
  padding: {
    padding: '12px 30px',
  }
}));

const NavigationBlock = ({resetAnswerVariants}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const categoryId = Number(useParams().id);
  const {currentCategory, inProcess} = useSelector(({category}) => category);
  const {questions, unansweredQuestions, currentQuestion} = useSelector(({questions}) => questions);
  const [questionNumber, setQuestionNumber] = useState(1);

  useLayoutEffect(() => {
    if (currentCategory?.id !== categoryId) {
      dispatch(setCurrentCategoryAC(categoryId));
      dispatch(fetchQuestionsAC(categoryId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    questions.length && dispatch(setCurrentQuestion(unansweredQuestions[questionNumber-1]));
    resetAnswerVariants();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionNumber])

  const startQuiz = () => {
    dispatch(setInProcess(true))
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
    resetAnswerVariants();
  }

  return (
    <>
      {
        inProcess
          ? ( <>
              <div className={styles.buttonsLine}>
                <ColorButton color="primary" variant="contained" onClick={onSubmitAnswer}>
                  Submit Answer
                </ColorButton>

                <div className={styles.navButtons}>
                  <Button color="primary" variant="outlined" onClick={prevQuestion}>
                    Previous question
                  </Button>

                  <Button color="primary" variant="outlined" onClick={nextQuestion}>
                    Next question
                  </Button>
                </div>
              </div>

              <Button
                className={classes.padding}
                color="secondary"
                size="large"
                variant="contained"
                onClick={endQuiz}
              >
                Finish Quiz
              </Button>

              <div className={styles.progressLine}>
                <ProgressBar
                  bgColor='#3f51b5'
                  borderRadius='0'
                  completed={20}
                  labelAlignment='outside'
                  labelColor='#000'
                />
              </div>
            </>
          )
          : <Button
            className={classes.padding}
            color="secondary"
            size="large"
            variant="contained"
            onClick={startQuiz}
          >
            StartQuiz
          </Button>
      }
    </>
  );
};

export default NavigationBlock;