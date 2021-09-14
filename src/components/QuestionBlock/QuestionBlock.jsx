import React, {useState} from 'react';
import styles from './QuestionBlock.module.sass';
import TitleSeparator from '../UI/TitleSeparator/TitleSeparator';
import Timer from '../Timer/Timer';
import MultipleAnswers from '../MultipleAnswers/MultipleAnswers';
import SingleAnswers from '../SingleAnswers/SingleAnswers';
import {useSelector} from 'react-redux';


const QuestionBlock = ({checkBoxValue, setCheckBoxValue, radioValue, setRadioValue}) => {
  const {questions, currentQuestion} = useSelector(({questions}) => questions);
  const {inProcess} = useSelector(({category}) => category);
  const index = questions.findIndex(item => item.id === currentQuestion?.id);


  const handleCheckBoxChange = e => {
    setCheckBoxValue({...checkBoxValue, [e.target.name]: e.target.checked});
  };

  const handleRadioChange = e => {
    setRadioValue(e.target.value);
  }

  return (
    <>
      <TitleSeparator title={`Question ${index + 1}`}/>

      <Timer status={inProcess}/>

      <div className={styles.questionsLine}>
        Question <b>{index + 1} </b> of {questions?.length}
      </div>
      <div className={styles.questionBlock}>
        {
          currentQuestion
            ? (<>
              <div className={styles.question}>{currentQuestion.question}</div>
              <div className={styles.variants}>
                {
                  currentQuestion.multiple_correct_answers
                    ? <MultipleAnswers
                      answers={currentQuestion.answers}
                      onChange={handleCheckBoxChange}
                      checkBoxValue={checkBoxValue}
                    />
                    : <SingleAnswers
                      answers={currentQuestion.answers}
                      onChange={handleRadioChange}
                      radioValue={radioValue}
                    />
                }
              </div>

            </>)
            : 'Вопросы закончились!'
        }

      </div>
    </>

  );
};

export default QuestionBlock;