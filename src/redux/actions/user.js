import {LOGOUT, SET_USER} from '../types';
import {userAPI} from '../../api/userAPI';
import bcrypt from 'bcryptjs';
import {uploadImage} from '../../api/uploadImage';


export const registerAC = async (user) => {
  const candidate = await userAPI.getUser(user.email)
    .then(({data}) => data[0])
    .catch(() => {
      return {
        status: 'error',
        message: `Registration Problems`
      }
    });

  if (candidate && candidate.email === user.email) {
    return {
      status: 'error',
      message: `A user with such a mail already exists!`
    }
  } else {
    let imageUrl;
    if (user.file) {
      imageUrl = await uploadImage(user.file[0].file).catch(() => alert('Проблемы при загрузке аватара!'));
    }

    const newUser = {
      name: user.name,
      email: user.email,
      password: bcrypt.hashSync(user.password, 8),
      imageUrl,
      date: new Date(),
      role: "customer"
    }
    await userAPI.addUser(newUser).catch(() => {
      return {
        status: 'error',
        message: `Registration Problems`
      }
    });
    return true;
  }
}

export const loginAC = (email, password) => {
  return async dispatch => {
    try {
      const user = await userAPI.getUser(email)
        .then(({data}) => data[0])
        .catch(() => {
          return {
            status: 'error',
            message: `Login Problems`
          }
        });

      if (!user || !bcrypt.compareSync(password, user.password)) {
        return {
          status: 'error',
          message: `Email-password pair does not match. Check your input and try again`
        }
      } else {
        localStorage.setItem("userData", JSON.stringify(user));
        dispatch(setUser(user));
        return user;
      }
    } catch (e) {
      alert(e.response);
    }
  }
}

// actions
export const setUser = user => ({type: SET_USER, payload: user});
export const logout = () => ({type: LOGOUT});