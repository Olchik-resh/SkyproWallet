import axios from 'axios'

const API_URL = 'http://localhost:3000'

export async function signIn(userData) {
  try {
    const response = await axios.post(API_URL + '/login', userData, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return response.data.user
  } catch (error) {
    console.error('Ошибка авторизации:', error)
    throw new Error(error.response?.data?.error || 'Ошибка авторизации')
  }
}

export async function signUp({ name, login, password }) {
  try {
    const response = await axios.post(
      API_URL + '/register',
      { name, login, password },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
    return response.data.user
  } catch (error) {
    console.error('Ошибка регистрации:', error)
    throw new Error(error.response?.data?.error || 'Ошибка регистрации')
  }
}
