import {instance} from "./index";

export const questionsAPI = {
  getQuestions(categoryId=null) {
    return instance.get(`questions/${categoryId ? `categoryId=${categoryId}` : ''}`);
  },
}