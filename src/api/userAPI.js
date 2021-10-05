import { instance } from "./index";

export const userAPI = {
  getUser(email=null) {
    return instance.get(`/users?${
      email !== null ? `email=${email}` : ''}`)
  },

  getUserById(id) {
    return instance.get(`/users/${id}`);
  },

  addUser(user) {
    return instance.post(`users`, user)
  },

  editUser(id, object) {
    return instance.patch(`users/${id}`, object)
  },
}