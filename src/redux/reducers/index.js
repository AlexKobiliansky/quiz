import {combineReducers} from 'redux';

import categoryReducer from './categoryReducer';
import questionsReducer from './questionsReducer';

const rootReducer = combineReducers({
  category: categoryReducer,
  questions: questionsReducer,
});

export default rootReducer;