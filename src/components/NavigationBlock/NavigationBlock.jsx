import React, {useEffect, useLayoutEffect, useState} from 'react';
import styles from '../../pages/CategoryPage/CategoryPage.module.sass';
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
import ProgressBar from '@ramonak/react-progress-bar';
import {purple} from '@material-ui/core/colors';
import {setCurrentCategoryAC, setInProcess} from '../../redux/actions/category';
import {fetchQuestionsAC, setCurrentQuestion, submitAnswer} from '../../redux/actions/questions';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory, useParams} from 'react-router-dom';

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
  const {currentCategory, inProcess} = useSelector(({category}) => category);
  const {questions, unansweredQuestions, answeredQuestions, currentQuestion} = useSelector(({questions}) => questions);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  let progress = Math.ceil(answeredQuestions.length / questions.length * 100);


  useLayoutEffect(() => {
    if (currentCategory?.id !== categoryId) {
      dispatch(setCurrentCategoryAC(categoryId));
      dispatch(fetchQuestionsAC(categoryId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    questions.length && dispatch(setCurrentQuestion(unansweredQuestions[questionNumber - 1]));
    resetAnswerVariants();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionNumber])

  const startQuiz = () => {
    dispatch(setInProcess(true))
    dispatch(setCurrentQuestion(unansweredQuestions[questionNumber - 1]))
  }

  const endQuiz = async () => {
    await dispatch(setInProcess(false));
    setOpenDialog(false);
    history.push('/results');
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
      endQuiz();
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
                    ? (
                      <Button color="primary" variant="outlined" onClick={prevQuestion}>
                        Previous question
                      </Button>
                    )
                    : null
                  }

                  {currentQuestion?.id !== unansweredQuestions[unansweredQuestions.length - 1]?.id
                    ? (
                      <Button color="primary" variant="outlined" onClick={nextQuestion}>
                        Next question
                      </Button>
                    )
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
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running.
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

export default NavigationBlock;