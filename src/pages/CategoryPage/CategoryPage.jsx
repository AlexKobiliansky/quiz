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
  const [radioValue, setRadioValue] = useState('');
  const [userAnswers, setUserAnswers] = useState(initialCheckBoxValue);

  const resetAnswerVariants = () => {
    setUserAnswers(initialCheckBoxValue);
    setRadioValue('');
  }

  const onRadioChange = e => {
    setRadioValue(e.target.value);
    setUserAnswers({...initialCheckBoxValue, [e.target.value]:true})
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
          userAnswers={userAnswers}
          setUserAnswers={setUserAnswers}
          radioValue={radioValue}
          onRadioChange={onRadioChange}
        />
        <NavigationBlock
          resetAnswerVariants={resetAnswerVariants}
          userAnswers={userAnswers}
        />
      </div>
    </div>
  );
}

export default React.memo(CategoryPage);