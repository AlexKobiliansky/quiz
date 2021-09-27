import React from 'react';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';

import {Skeleton} from '@material-ui/lab';
import {makeStyles} from '@material-ui/core';

import TitleSeparator from '../UI/TitleSeparator/TitleSeparator';
import Timer from '../Timer/Timer';
import MultipleAnswers from '../MultipleAnswers/MultipleAnswers';
import SingleAnswers from '../SingleAnswers/SingleAnswers';

import styles from './QuestionBlock.module.sass';
import {currentQuestionSelector, questionsSelector} from '../../redux/selectors/questionsSelectors';
import NavigationBlockSkeleton from '../UI/Skeletons/NavigationBlockSkeleton/NavigationBlockSkeleton';

const QuestionBlock = ({userAnswers, setUserAnswers, radioValue, onRadioChange}) => {
  const questions = useSelector(questionsSelector);
  const currentQuestion = useSelector(currentQuestionSelector);
  const {inProcess} = useSelector(({category}) => category);
  const index = questions.findIndex(item => item.id === currentQuestion?.id);

  const handleCheckBoxChange = e => {
    setUserAnswers({...userAnswers, [e.target.name]: e.target.checked});
  };

  let questionMarkup = <div className={styles.questionWrap}>
    {
      currentQuestion
        ? (<>
          <div className={styles.question}>{currentQuestion.question}</div>
          <div>
            {
              currentQuestion.multiple_correct_answers
                ? <MultipleAnswers
                  answers={currentQuestion.answers}
                  onChange={handleCheckBoxChange}
                  checkBoxValue={userAnswers}
                />
                : <SingleAnswers
                  answers={currentQuestion.answers}
                  onChange={onRadioChange}
                  radioValue={radioValue}
                />
            }
          </div>

        </>)
        : 'Вопросы закончились!'
    }
  </div>

  let questionsLine = `Question <strong>${index + 1}</strong> of ${questions?.length}`

  return <div className={styles.questionBlock}>
    {inProcess
      ? <>
          <TitleSeparator title={`Question ${index + 1}`}/>
          <Timer />
          <div className={styles.questionsLine} dangerouslySetInnerHTML={{ __html: questionsLine }} />
          {questionMarkup}
        </>

      : <NavigationBlockSkeleton />
      }
  </div>
};

QuestionBlock.propTypes = {
  userAnswers: PropTypes.object.isRequired,
  setUserAnswers: PropTypes.func.isRequired,
  radioValue: PropTypes.string,
  onRadioChange: PropTypes.func.isRequired
}

export default React.memo(QuestionBlock);