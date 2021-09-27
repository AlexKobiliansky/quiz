export const countAnswers = (arr1, arr2) => {
  let count = 0;
  if (!arr2.length) return 0;

  outer: for (let i = 0; i < arr1.length; i++) {
    let question = arr1[i];
    let userAnswer = arr2.filter(item => item.id === question.id)

    if (userAnswer.length) {
      for (let key in question.answers) {
        if (question.correct_answers[key] !== userAnswer[0].userAnswers[key]) continue outer;
      }
      count +=1;
    }

  }
  return count;
}