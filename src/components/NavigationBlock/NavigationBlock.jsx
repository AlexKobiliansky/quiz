import React, {useEffect, useLayoutEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory, useParams} from 'react-router-dom';
import ProgressBar from '@ramonak/react-progress-bar';
import PropTypes from 'prop-types';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  makeStyles,
  withStyles
} from '@material-ui/core';
import {purple} from '@material-ui/core/colors';

import {setCurrentCategoryAC, setInProcess} from '../../redux/actions/category';
import {fetchQuestionsAC, restartQuiz, setCurrentQuestion, submitAnswer} from '../../redux/actions/questions';

import styles from '../../pages/CategoryPage/CategoryPage.module.sass';

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
  finishButton: {
    padding: '12px 30px',
    margin: '20px auto 0',
    display: 'block'
  }
}));

const NavigationBlock = ({resetAnswerVariants, userAnswers}) => {
  const classes = useStyles();
  const history = useHistory()
  const dispatch = useDispatch();
  const categoryId = Number(useParams().id);
  const {inProcess, currentCategory} = useSelector(({category}) => category);
  const {questions, unansweredQuestions, answeredQuestions, currentQuestion} = useSelector(({questions}) => questions);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [openDialog, setOpenDialog] = useState(false);

  const onRestartQuiz = async () => {
    await dispatch(setCurrentCategoryAC(categoryId));
    await dispatch(fetchQuestionsAC(categoryId));
    dispatch(restartQuiz())
  }

  useLayoutEffect(() => {
      onRestartQuiz();
      return (() => dispatch(setInProcess(false)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    questions.length && dispatch(setCurrentQuestion(unansweredQuestions[questionNumber - 1]));
    console.log('question number: ', questionNumber-1);
    resetAnswerVariants();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionNumber]);

  useEffect(() => {
    if (!currentCategory) {
      history.push('/')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCategory])

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  let progress = Math.ceil(answeredQuestions.length / questions.length * 100);

  const startQuiz = () => {
    dispatch(setInProcess(true))
    dispatch(setCurrentQuestion(unansweredQuestions[questionNumber - 1]))
  }

  const endQuiz = async () => {
    await dispatch(setInProcess(false));
    setOpenDialog(false);
    setQuestionNumber(1);
    history.push('/results');
  }

  const nextQuestion = () => {
    if (unansweredQuestions.length !== 1) {
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
      endQuiz();
    }

    if (questionNumber < unansweredQuestions.length) {
      dispatch(setCurrentQuestion(unansweredQuestions[questionNumber]))
    } else {
      dispatch(setCurrentQuestion(unansweredQuestions[0]))
      setQuestionNumber(1)
    }

    let answer = {
      ...currentQuestion,
      userAnswers
    }

    dispatch(submitAnswer(answer));
    resetAnswerVariants();
  }

  return (
    <>
      {
        inProcess
          ? (<>
              <div className={styles.buttonsLine}>
                <ColorButton color="primary" variant="contained" onClick={onSubmitAnswer}>
                  Submit Answer
                </ColorButton>

                <div className={styles.navButtons}>
                  {currentQuestion?.id !== unansweredQuestions[0]?.id
                    ? <Button color="primary" variant="outlined" onClick={prevQuestion}>
                        Previous question
                      </Button>
                    : null
                  }

                  {currentQuestion?.id !== unansweredQuestions[unansweredQuestions.length - 1]?.id
                    ? <Button color="primary" variant="outlined" onClick={nextQuestion}>
                        Next question
                      </Button>
                    : null
                  }
                </div>
              </div>

              <div className={styles.progressLine}>
                <ProgressBar
                  bgColor='#3f51b5'
                  borderRadius='0'
                  completed={progress}
                  labelAlignment='outside'
                  labelColor='#000'
                />
              </div>

              <Button
                className={classes.finishButton}
                color="secondary"
                size="large"
                variant="contained"
                onClick={handleOpenDialog}
              >
                Finish Quiz
              </Button>
            </>
          )
          : <Button
            className={classes.finishButton}
            color="secondary"
            size="large"
            variant="contained"
            onClick={startQuiz}
          >
            StartQuiz
          </Button>
      }

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            There are at least one unanswered question in current quiz. Are you sure you want to end without answering?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={endQuiz} autoFocus>
            Finish Quiz
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

NavigationBlock.propTypes = {
  resetAnswerVariants: PropTypes.func,
  userAnswers: PropTypes.object
}

export default React.memo(NavigationBlock);