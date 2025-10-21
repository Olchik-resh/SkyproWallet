// import axios from 'axios'
// import { ref } from 'vue'

// // ---- Реактивные переменные ----
// const user = ref(JSON.parse(localStorage.getItem('user') || 'null'))
// const token = ref(localStorage.getItem('access_token') || null)

// // ---- API-функции регистрации и логина ----
// async function signUp({ name, login, password }) {
//   // Проверки на обязательные поля, можно добавить более строгие, если хотите
//   if (!name || !login || !password) {
//     throw new Error('Все поля обязательны для заполнения!')
//   }
//   // Запрос на регистрацию
//   try {
//     const response = await axios.post('https://wedev-api.sky.pro/api/user', {
//       name,
//       login,
//       password,
//     })
//     // Сохраняем пользователя и токен
//     const userData = response.data.user
//     user.value = userData
//     token.value = userData.token
//     localStorage.setItem('user', JSON.stringify(userData))
//     localStorage.setItem('access_token', userData.token)
//     return userData
//   } catch (e) {
//     if (e.response && e.response.status === 400) {
//       throw new Error('Пользователь с таким логином уже существует!')
//     }
//     throw new Error(e.response?.data?.error || 'Ошибка регистрации')
//   }
// }

// async function signIn({ login, password }) {
//   if (!login || !password) {
//     throw new Error('Логин и пароль обязательны!')
//   }
//   try {
//     const response = await axios.post('https://wedev-api.sky.pro/api/user/login', {
//       login,
//       password,
//     })
//     // Сохраняем пользователя и токен
//     const userData = response.data.user
//     user.value = userData
//     token.value = userData.token
//     localStorage.setItem('user', JSON.stringify(userData))
//     localStorage.setItem('access_token', userData.token)
//     return userData
//   } catch (e) {
//     if (e.response && e.response.status === 400) {
//       throw new Error('Неправильный логин или пароль!')
//     }
//     throw new Error(e.response?.data?.error || 'Ошибка авторизации')
//   }
// }

// function logout() {
//   user.value = null
//   token.value = null
//   localStorage.removeItem('user')
//   localStorage.removeItem('access_token')
// }

// function setUserInfo(newUser) {
//   user.value = newUser
//   localStorage.setItem('user', JSON.stringify(newUser))
// }

// function setToken(newToken) {
//   token.value = newToken
//   localStorage.setItem('access_token', newToken)
// }

// function getToken() {
//   return token.value || localStorage.getItem('access_token')
// }

// const auth = {
//   user,
//   token,
//   signUp,
//   signIn,
//   logout,
//   setUserInfo,
//   setToken,
//   getToken,
// }

// export default auth

import axios from 'axios'

const API_URL = 'https://wedev-api.sky.pro/api/user'

export async function signUp({ name, login, password }) {
  try {
    const response = await axios.post(
      API_URL,
      { name, login, password },
      { headers: { 'Content-Type': '' } },
    )
    return response.data
  } catch (error) {
    console.error('Ошибка регистрации:', error.response?.data || error)
    throw new Error(error.response?.data?.error || 'Ошибка регистрации')
  }
}

export async function signIn({ login, password }) {
  try {
    const response = await axios.post(
      API_URL + '/login',
      { login, password },
      { headers: { 'Content-Type': '' } },
    )
    return response.data
  } catch (error) {
    console.error('Ошибка авторизации:', error.response?.data || error)
    throw new Error(error.response?.data?.error || 'Ошибка авторизации')
  }
}

const auth = { signIn, signUp }
export default auth
