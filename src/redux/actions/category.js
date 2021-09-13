import {categoryAPI} from "../../api/categoryAPI";
import {SET_CATEGORIES, SET_CURRENT_CATEGORY, SET_LOADING_CATEGORY} from '../types';

export const fetchCategoriesAC = () => async dispatch  => {
  try {
    dispatch(setLoading(true));
    const {data} = await categoryAPI.getCategories();
    dispatch(fetchCategories(data));
  } catch(e) {
    alert(`Ошибка при загрузке категорий: ${e.message}`)
  }
};

export const setCurrentCategoryAC = id => async dispatch => {
  try {
    dispatch(setLoading(true))
    const {data} = await categoryAPI.getCurrentCategory(id);
    dispatch(setCurrentCategory(data))
  } catch(e) {
    alert(`Ошибка при загрузке категории: ${e.message}`);
  }
}

//actions
const setLoading = loading => ({type: SET_LOADING_CATEGORY, payload: loading});
const fetchCategories = categories => ({type: SET_CATEGORIES, payload: categories});
const setCurrentCategory = category => ({type: SET_CURRENT_CATEGORY, payload: category})