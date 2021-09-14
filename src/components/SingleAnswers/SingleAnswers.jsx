import React from 'react';
import {FormControlLabel, Radio, RadioGroup} from '@material-ui/core';

const SingleAnswers = ({answers, onChange, radioValue}) => {
  return (
    <>
      <RadioGroup aria-label="gender" name="gender1" value={radioValue} onChange={onChange}>
        {answers && Object.keys(answers).map(item => (
          answers[item]
            ? <FormControlLabel
              value={item}
              control={<Radio color="primary"/>}
              label={answers[item]}
              key={item}
            />
            : null
        ))}
      </RadioGroup>
    </>
  );
};

export default SingleAnswers;