import { instance } from "./index";

export const userAPI = {
  getUser(email=null, password=null) {
    return instance.get(`/users?${
      email !== null ? `login=${email}` : ''}&${
      password !== null ? `password=${password}` : ''}`)
  },

  addUser(user) {
    return instance.post(`users`, user)
  }
}