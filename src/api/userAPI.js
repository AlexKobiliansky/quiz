import { instance } from "./index";

export const userAPI = {
  getUser(email=null) {
    return instance.get(`/users?${
      email !== null ? `email=${email}` : ''}`)
  },

  addUser(user) {
    return instance.post(`users`, user)
  }
}