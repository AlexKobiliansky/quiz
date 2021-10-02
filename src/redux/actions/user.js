import {LOGOUT, SET_USER} from '../types';
import {userAPI} from '../../api/userAPI';
import bcrypt from 'bcryptjs';
import {uploadImage} from '../../api/uploadImage';


export const registerAC = async (user) => {
  const candidate = await userAPI.getUser(user.email)
    .then(({data}) => data[0])
    .catch(() => {
      alert('Проблемы при регистрации');
      return false;
    });

  if (candidate && candidate.email === user.email) {
    alert(`Пользователь с такой почтой уже существует!`);
    return false;
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
      alert('Проблемы при регистрации');
      return false;
    });

    alert('Регистрация успешна!')
    return true;
  }
}

export const loginAC = (email, password) => {
  return async dispatch => {
    try {
      let hash = bcrypt.hashSync(password, 8)
      const user = await userAPI.getUser(email)
        .then(({data}) => data[0])
        .catch(() => {
          alert('Проблемы при авторизации');
        });

      if (!user || bcrypt.compareSync(user.password, hash)) {
        alert(`Не совпадает пара Email-пароль. Проверьте вводимые данные и попробуйте снова`);
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