import React, {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {TextField} from '@material-ui/core';
import styles from './CustomLabel.module.sass';
import {makeStyles} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Create';
import {Skeleton} from '@material-ui/lab';

const useStyles = makeStyles({
  root: {
    '& .MuiInputBase-root.Mui-disabled': {
      color: '#000'
    }
  }
})

const CustomLabel = ({title, value, entity, onEdit, loading}) => {
  const classes = useStyles();
  const [active, setActive] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const input = useRef();

  const activateEditMode = () => {
    setActive(true);
    setTimeout(() => input.current.focus(), 0)
  }

  useEffect(() => setInputValue(value), [value]);

  const deactivateEditMode = () => {
    setActive(false);
    onEdit(entity, inputValue);
  }

  const handleChange = (e) => {
    setInputValue(e.target.value)
  }

  return (
    <div className={styles.customLabel}>
      {
        loading
          ? <Skeleton variant="rect" width='100%' height={25} />
          : <>
            <TextField
              id={entity}
              name={entity}
              type="text"
              label={title}
              className={classes.root}
              onChange={handleChange}
              onBlur={deactivateEditMode}
              value={inputValue}
              disabled={!active}
              inputRef={input}
              fullWidth
            />
            <EditIcon color="primary" onClick={activateEditMode} />
          </>
      }
    </div>
  );
};

CustomLabel.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.any,
  entity: PropTypes.string.isRequired,
  onEdit: PropTypes.func
}

export default CustomLabel;