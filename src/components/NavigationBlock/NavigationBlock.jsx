import React from 'react';
import styles from '../../pages/CategoryPage/CategoryPage.module.sass';
import {Button, makeStyles, withStyles} from '@material-ui/core';
import ProgressBar from '@ramonak/react-progress-bar';
import {purple} from '@material-ui/core/colors';

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

const NavigationBlock = ({status, startQuiz, endQuiz}) => {
  const classes = useStyles();
  return (
    <>
      {
        status
          ? ( <>
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