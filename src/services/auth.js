// import axios from 'axios'

// const API_URL = 'http://localhost:3000'

// export async function signIn(userData) {
//   try {
//     const response = await axios.post(API_URL + '/login', userData, {
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     })
//     return response.data.user
//   } catch (error) {
//     console.error('Ошибка авторизации:', error)
//     throw new Error(error.response?.data?.error || 'Ошибка авторизации')
//   }
// }

// export async function signUp({ name, login, password }) {
//   try {
//     const response = await axios.post(
//       API_URL + '/register',
//       { name, login, password },
//       {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       },
//     )
//     return response.data.user
//   } catch (error) {
//     console.error('Ошибка регистрации:', error)
//     throw new Error(error.response?.data?.error || 'Ошибка регистрации')
//   }
// }



// Заглушка для signIn
export async function signIn({ login, password }) {
  await new Promise((r) => setTimeout(r, 500))

  return {
    id: 1,
    name: 'Демо Пользователь',
    login,
  }
}

// Заглушка для signUp
export async function signUp({ name, login, password }) {
  await new Promise((r) => setTimeout(r, 500))
  return {
    id: 2,
    name: name || 'Демо Пользователь',
    login,
  }
}
