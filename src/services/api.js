// {
//   "access_token": {
//     "type": "string",
//     "title": "Bearer токен",
//     "description": "Токен авторизации пользователя. Формат: без слова Bearer, только сам токен."
//   }
// }

import axios from "axios";

export default async function run({ data }) {
  // Формируем заголовки с авторизацией
  const headers = {
    Authorization: `Bearer ${data.access_token}`,
  };

  try {
    // GET запрос к API транзакций
    const response = await axios.get(
      "https://wedev-api.sky.pro/api/transactions",
      { headers }
    );

    // Результат: массив транзакций
    return {
      transactions: response.data,
    };
  } catch (error) {
    // В случае ошибки выводим часть сообщения
    return {
      error: error.response?.data || error.message,
    };
  }
}
