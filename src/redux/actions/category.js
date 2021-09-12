import {categoryAPI} from "../../api/categoryAPI";
import {SET_CATEGORIES, SET_LOADING_CATEGORY} from '../types';

export const fetchCategoriesAC = () => async dispatch  => {
  try {
    dispatch(setLoading(true));
    const {data} = await categoryAPI.getCategories();
    dispatch(fetchCategories(data));
  } catch(e) {
    alert(`Ошибка при загрузке категорий: ${e.message}`)
  }
};

//actions
const setLoading = loading => ({type: SET_LOADING_CATEGORY, payload: loading});
const fetchCategories = categories => ({type: SET_CATEGORIES, payload: categories});