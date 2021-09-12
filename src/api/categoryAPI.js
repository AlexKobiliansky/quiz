import {instance} from "./index";

export const categoryAPI = {
  getCategories() {
    return instance.get(`categories/`);
  },
}