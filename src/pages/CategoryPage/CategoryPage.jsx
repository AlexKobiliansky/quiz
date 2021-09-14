import React, {useState} from 'react';

import {Typography} from '@material-ui/core';
import QuestionBlock from '../../components/QuestionBlock/QuestionBlock';
import styles from './CategoryPage.module.sass'
import {useSelector} from 'react-redux';
import NavigationBlock from '../../components/NavigationBlock/NavigationBlock';

const initialCheckBoxValue = {
  answer_a: false,
  answer_b: false,
  answer_c: false,
  answer_d: false,
  answer_e: false,
  answer_f: false,
}

function CategoryPage() {
  const {currentCategory, isLoading} = useSelector(({category}) => category);
  const [checkBoxValue, setCheckBoxValue] = useState(initialCheckBoxValue);
  const [radioValue, setRadioValue] = React.useState('');

  const resetAnswerVariants = () => {
    setCheckBoxValue(initialCheckBoxValue);
    setRadioValue('');
  }

  return (
    <div>
      <Typography
        align="center"
        component="h1"
        gutterBottom
        variant="h2"
      >
        Category: {!isLoading ? <b>{currentCategory.title}</b> : 'Идет загрузка'}
      </Typography>

      <div className={styles.quizWindow}>
        <QuestionBlock
          checkBoxValue={checkBoxValue}
          setCheckBoxValue={setCheckBoxValue}
          radioValue={radioValue}
          setRadioValue={setRadioValue}
        />
        <NavigationBlock resetAnswerVariants={resetAnswerVariants} />
      </div>
    </div>
  );
}

export default React.memo(CategoryPage);