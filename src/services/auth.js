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
