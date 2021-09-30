import React, {useState} from 'react';
import {InputLabel, TextField} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import styles from './CustomPasswordField.module.sass'

const CustomPasswordField = ({id, name, label, onChange, onBlur, value, helperText, error}) => {
  let [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <InputLabel className={styles.label}>
      <TextField
        id={id}
        name={name}
        type={showPassword ? 'text' : 'password'}
        label={label}
        className="textField"
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        helperText={helperText}
        error={!!error}
        fullWidth
      />
      <IconButton
        aria-label="toggle password visibility"
        onClick={handleShowPassword}
        onMouseDown={handleMouseDownPassword}
        className={styles.icon}
      >
        {showPassword ? <Visibility /> : <VisibilityOff />}
      </IconButton>
    </InputLabel>
  );
};

export default React.memo(CustomPasswordField);