import React from 'react';

import {Button, Typography, withStyles, makeStyles} from '@material-ui/core';
import {purple} from '@material-ui/core/colors';
import ProgressBar from "@ramonak/react-progress-bar";

import QuestionBlock from '../../components/QuestionBlock/QuestionBlock';
import TitleSeparator from '../../components/UI/TitleSeparator/TitleSeparator';
import styles from './CategoryPage.module.sass'


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

function CategoryPage() {
  const classes = useStyles();

  return (
      <div>
          <Typography
              align="center"
              component="h1"
              gutterBottom
              variant="h2"
          >
              Category:
              <b>
                  HTML
              </b>
          </Typography>

          <div className={styles.quizWindow}>
              <TitleSeparator title="Question 1" />

              <div className={styles.questionsLine}>
                  Question
                  <b>
                      1
                  </b>

                  {' '}
                  of 10
              </div>

              <div className={styles.timerLine}>
                  Time:
                  <b>
                      0:00
                  </b>
              </div>

              <QuestionBlock />

              <div className={styles.buttonsLine}>
                  <ColorButton
                      color="primary"
                      variant="contained"
                  >
                      Submit Answer
                  </ColorButton>

                  <div className={styles.navButtons}>
                      <Button
                          color="primary"
                          variant="outlined"
                      >
                          Previous question
                      </Button>

                      <Button
                          color="primary"
                          variant="outlined"
                      >
                          Next question
                      </Button>
                  </div>
              </div>

              <Button
                  className={classes.padding}
                  color="secondary"
                  size="large"
                  variant="contained"
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
          </div>


      </div>
  );
}

export default CategoryPage;