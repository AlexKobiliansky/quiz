import React from 'react';
import {useSelector} from 'react-redux';

const ResultsPage = () => {
  const {currentCategory, timer} = useSelector(({category}) => category);
  const {questions, answeredQuestions} = useSelector(({questions}) => questions);


  console.log(questions, answeredQuestions)
  return (
    <div>
      <h1>Category: {currentCategory.title}</h1>
      <h2>Suspended time: {timer.h}:{timer.m}:{timer.s}</h2>
    </div>
  );
};

export default ResultsPage;