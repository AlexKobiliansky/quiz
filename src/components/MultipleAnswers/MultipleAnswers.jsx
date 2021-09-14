import React from 'react';
import {Checkbox, FormControlLabel} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    display: 'block'
  },
});

const MultipleAnswers = ({answers, onChange, checkBoxValue}) => {
  const classes = useStyles();
  return (
    <>
      {answers && Object.keys(answers).map(item => (
        answers[item]
          ? <FormControlLabel
            control={
              <Checkbox
                checked={checkBoxValue[item]}
                onChange={onChange}
                name={item}
                color="primary"
                key={item}
              />
            }
            label={answers[item]}
            className={classes.root}
            key={item}
          />
          : null
      ))}
    </>
  );
};

export default MultipleAnswers;