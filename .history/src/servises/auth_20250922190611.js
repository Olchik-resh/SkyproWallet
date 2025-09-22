// import axios from 'axios'

// const API_URL = ''

// export async function signIn(userData) {
//   try {
//     const data = await axios.post(API_URL + '/login', userData, {
//       headers: {
//         'Content-Type': '',
//       },
//     })

//     return data.data.user
//   } catch (error) {
//     error.value = error.message
//     console.error('Ошибка авторизации:', error)
//     throw new Error(error.response.data.error || 'Ошибка авторизации')
//   }
// }

// export async function signUp({ name, login, password }) {
//   try {
//     const data = await axios.post(
//       API_URL,
//       { name, login, password },
//       {
//         headers: {
//           'Content-Type': '',
//         },
//       },
//     )
//     return data.data.user
//   } catch (error) {
//     error.value = error.message
//     console.error('Ошибка регистрации:', error)
//     throw new Error(error.response.data.error || 'Ошибка регистрации')
//   }
// }


import axios from "axios"

const API_URL = "https://jsonplaceholder.typicode.com"

export async function signIn({ login, password }) {
  // Здесь просто пример, так как jsonplaceholder не поддерживает авторизацию
  const res = await axios.get(`${API_URL}/users/1`)
  return res.data
}

export async function signUp({ name, login, password }) {
  // Пример запроса на создание пользователя
  const res = await axios.post(`${API_URL}/users`, { name, email: login })
  return res.data
}
