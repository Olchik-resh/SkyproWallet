import { ref } from 'vue'

// ---- Вспомогательные функции для работы с пользователями ----
let users = []

function isEmail(str) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str)
}

// ---- API-функции регистрации и логина ----
export async function signUp({ name, login, password }) {
  await new Promise((r) => setTimeout(r, 500))
  if (!name || name.trim().length < 2) {
    throw new Error('Упс! Введенные вами данные некорректны. Введите данные корректно и повторите попытку.')
  }
  if (!isEmail(login)) {
    throw new Error('Упс! Введенные вами данные некорректны. Введите данные корректно и повторите попытку.')
  }
  if (!password || password.length < 6) {
    throw new Error('Упс! Введенные вами данные некорректны. Введите данные корректно и повторите попытку.')
  }
  if (users.find((user) => user.login === login)) {
    throw new Error('Упс! Введенные вами данные некорректны. Введите данные корректно и повторите попытку.')
  }
  const user = {
    id: users.length + 1,
    name: name.trim(),
    login,
    password,
  }
  users.push(user)
  // Генерируем "токен" (например, просто строку id)
  const token = 'token_' + user.id
  return {
    user: {
      id: user.id,
      name: user.name,
      login: user.login,
    },
    token,
  }
}

export async function signIn({ login, password }) {
  await new Promise((r) => setTimeout(r, 500))
  const user = users.find((u) => u.login === login && u.password === password)
  if (!user) {
    throw new Error('Неверный логин или пароль.')
  }
  const token = 'token_' + user.id
  return {
    user: {
      id: user.id,
      name: user.name,
      login: user.login,
    },
    token,
  }
}

// ---- Реактивный объект авторизации ----
const user = ref(JSON.parse(localStorage.getItem('user') || 'null'))
const token = ref(localStorage.getItem('access_token') || null)

const auth = {
  user,
  token,
  setUserInfo(newUser) {
    user.value = newUser
    localStorage.setItem('user', JSON.stringify(newUser))
  },
  setToken(newToken) {
    token.value = newToken
    localStorage.setItem('access_token', newToken)
  },
  getToken() {
    return token.value || localStorage.getItem('access_token')
  },
  logout() {
    user.value = null
    token.value = null
    localStorage.removeItem('access_token')
    localStorage.removeItem('user')
  },
}

export default auth
