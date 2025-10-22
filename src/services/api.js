
import axios from 'axios'

export default async function run({ data }) {
  if (!data.access_token) {
    return { error: 'Access token not provided' }
  }

  const headers = {
    Authorization: `Bearer ${data.access_token}`,
  }

  try {
    const response = await axios.get('https://wedev-api.sky.pro/api/transactions', { headers })
    const transactions = Array.isArray(response.data) ? response.data : []

    return {
      transactions,
    }
  } catch (error) {
    return {
      error: error.response?.data?.message || error.message || 'Unknown error',
      status: error.response?.status,
    }
  }
}
