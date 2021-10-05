import {LOGOUT, SET_CURRENT_USER, SET_LOADING_USER, SET_USER, UPDATE_CURRENT_USER, UPDATE_USER} from '../types';
import {userAPI} from '../../api/userAPI';
import bcrypt from 'bcryptjs';
import {uploadImage} from '../../api/uploadImage';


export const fetchUserByIdAC = (userId) => async dispatch  => {
  try {
    dispatch(setLoadingUser(true));
    userAPI.getUserById(userId).then(({data}) => dispatch(setUser(data)));
  } catch(e) {
    alert(e.message)
  }
};

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
        dispatch(setCurrentUser(user));
        return user;
      }
    } catch (e) {
      alert(e.response);
    }
  }
}

export const updateUserAC = (userId, obj) => async dispatch => {
  try {
    userAPI.editUser(userId, obj);
    dispatch(updateUser(obj));
  } catch(e) {
    alert(`Problems during updating user ${e.message}`);
  }
}

export const updateCurrentUserAC = (obj) => async dispatch => {
  dispatch(updateCurrentUser(obj));
  const user = JSON.parse(localStorage.getItem('userData'));
  localStorage.setItem('userData', JSON.stringify({...user, [Object.keys(obj)[0]]: Object.values(obj)[0]}));
}

export const logoutAC = () => dispatch => {
  localStorage.removeItem('userData');
  dispatch(logout());
}

// actions
export const setCurrentUser = user => ({type: SET_CURRENT_USER, payload: user});
export const setUser = user => ({type: SET_USER, payload: user});
export const setLoadingUser = isLoading => ({type: SET_LOADING_USER, payload: isLoading});
export const updateUser = obj => ({type: UPDATE_USER, payload: obj});
export const updateCurrentUser = obj => ({type: UPDATE_CURRENT_USER, payload: obj});
export const logout = () => ({type: LOGOUT});