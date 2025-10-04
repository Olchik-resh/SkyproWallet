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

// Примитивная email проверка
function isEmail(str) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str)
}

// Минимальная валидация для регистрации
export async function signUp({ name, login, password }) {
  await new Promise((r) => setTimeout(r, 500))

  if (!name || name.trim().length < 2) {
    throw new Error('Имя должно быть не менее 2 символов.')
  }
  if (!isEmail(login)) {
    throw new Error('Введите корректный email.')
  }
  if (!password || password.length < 6) {
    throw new Error('Пароль должен быть не менее 6 символов.')
  }

  // Допустим, email уже занят
  if (login === 'demo@example.com') {
    throw new Error('Этот email уже зарегистрирован.')
  }

  return {
    id: 2,
    name: name || 'Демо Пользователь',
    login,
  }
}

// Минимальная валидация для входа
export async function signIn({ login, password }) {
  await new Promise((r) => setTimeout(r, 500))

  // Пример: только один demo пользователь
  if (login !== 'demo@example.com' || password !== 'demo123') {
    throw new Error('Неверный логин или пароль.')
  }

  return {
    id: 1,
    name: 'Демо Пользователь',
    login,
  }
}
