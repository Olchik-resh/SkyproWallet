// services/transactions.js
import axios from 'axios'

export async function getTransactions(token) {
  const response = await axios.get('https://wedev-api.sky.pro/api/transactions', {
    headers: { Authorization: `Bearer ${token}` }
  })
  return response.data
}
