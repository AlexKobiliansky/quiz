import React, {useState} from 'react';

import {Checkbox, FormControlLabel} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import styles from './QuestionBlock.module.sass';

const useStyles = makeStyles({
  root: {
    display: 'block'
  },
});

const QuestionBlock = () => {
  const classes = useStyles();
  const [state, setState] = useState({
    checkedA: true,
    checkedB: true,
    checkedC: true,
    checkedD: true,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };


  return (
    <div className={styles.questionBlock}>
      <div className={styles.question}>What should be ...?</div>
      <div className={styles.variants}>
        <div className="variant">
          <FormControlLabel
            control={
              <Checkbox
                checked={state.checkedA}
                onChange={handleChange}
                name="checkedA"
                color="primary"
              />
            }
            label="Primary"
            className={classes.root}
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={state.checkedB}
                onChange={handleChange}
                name="checkedB"
                color="primary"
              />
            }
            label="Primary"
            className={classes.root}
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={state.checkedC}
                onChange={handleChange}
                name="checkedC"
                color="primary"
              />
            }
            label="Primary"
            className={classes.root}
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={state.checkedD}
                onChange={handleChange}
                name="checkedD"
                color="primary"
              />
            }
            label="Primary"
            className={classes.root}
          />
        </div>
      </div>
    </div>
  );
};

export default QuestionBlock;