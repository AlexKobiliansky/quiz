import React, {useState} from 'react';
import {FieldArray} from 'formik';
import styles from './CustomFileField.module.sass'
import {Button, InputLabel} from '@material-ui/core';
import {getUploadFileErrorsMessages} from '../../../utils/getUploadFileErrorsMessages';
import {getImageSchema} from '../../../utils/getImageSchema';

const CustomFileField = ({name, values, errors}) => {
  const [uploadFile, setUploadFile] = useState(null);

  return (
    <InputLabel className={styles.label}>
      <FieldArray name={name}>
        {(arrayHelper) => (
          <input
            type="file"
            name={name}
            className={styles.input}
            onChange={(e) => {
              const {files} = e.target;
              const file = getImageSchema(files.item(0));
              setUploadFile(file);
              if (!file) {
                arrayHelper.remove(0)
              }
              if (Array.isArray(values)) {
                arrayHelper.replace(0, file)
              } else {
                arrayHelper.push(file)
              }
            }}
          />
        )}
      </FieldArray>
      <div className={styles.mask}>
        <Button
          variant="contained"
          component="span"
          color="primary"
          className={styles.button}
        >Upload Photo
        </Button>
        <span className={`${styles.filename} ${errors ? styles.hasErrors : ''}`}>
          {uploadFile ? uploadFile.name : 'File not loaded'}
        </span>
      </div>
      <div className={styles.errors}>
        {getUploadFileErrorsMessages(errors)}
      </div>
    </InputLabel>
  );
};

export default React.memo(CustomFileField);