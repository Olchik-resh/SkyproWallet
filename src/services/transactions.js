// services/transactions.js
import axios from 'axios'

const API_URL = 'https://wedev-api.sky.pro/api/transactions'

function getAuthHeader(token) {
  return { Authorization: `Bearer ${token}` }
}

// Получить все транзакции
export async function getTransactions(token) {
  const response = await axios.get(API_URL, {
    headers: getAuthHeader(token),
  })
  return response.data
}

// Получить транзакции с фильтрацией и сортировкой
export async function getTransactionsFiltered(token, { sortBy, filterBy } = {}) {
  const params = {}
  if (sortBy) params.sortBy = sortBy
  if (filterBy) params.filterBy = filterBy
  const response = await axios.get(API_URL, {
    params,
    headers: getAuthHeader(token),
  })
  return response.data
}

// Добавить транзакцию
export async function addTransaction(token, transaction) {
  if (!token) {
    throw new Error('Токен не найден!')
  }
  try {
    const payload = {
      description: transaction.description,
      sum: Number(transaction.sum),
      category: transaction.category,
      date: transaction.date,
    }
    const response = await axios.post(API_URL, payload, {
      headers: {
        ...getAuthHeader(token),
        'Content-Type': '',
      },
    })
    return response.data
  } catch (error) {
    console.error('Ошибка при добавлении транзакции:', error.response?.data || error.message)
    throw error
  }
}

// Удалить транзакцию
export async function deleteTransaction(token, transactionId) {
  const response = await axios.delete(`${API_URL}/${transactionId}`, {
    headers: getAuthHeader(token),
  })
  return response.data
}

// Обновить транзакцию
export async function updateTransaction(token, transactionId, transaction) {
  // transaction = { description, sum, category, date }
  const response = await axios.patch(`${API_URL}/${transactionId}`, transaction, {
    headers: getAuthHeader(token),
  })
  return response.data
}

// Получить транзакции за период
export async function getTransactionsByPeriod(token, { start, end }) {
  const response = await axios.post(
    `${API_URL}/period`,
    { start, end },
    {
      headers: getAuthHeader(token),
    },
  )
  return response.data
}
