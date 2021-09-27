export const compareAnswers = (obj1, obj2) => {
  if (!obj2) return false;
  for (let key in obj1.correct_answers) {
    if (obj1.correct_answers[key] !== obj2.userAnswers[key]) return false;
  }
  return true;
}