import React from 'react';
import {FormControlLabel, Radio, RadioGroup} from '@material-ui/core';
import PropTypes from 'prop-types';

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

SingleAnswers.propTypes = {
  answers: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  radioValue: PropTypes.string
}

export default SingleAnswers;