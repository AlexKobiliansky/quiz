import {combineReducers} from 'redux';

import categoryReducer from './categoryReducer';
import questionsReducer from './questionsReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  category: categoryReducer,
  questions: questionsReducer,
  user: userReducer
});

export default rootReducer;