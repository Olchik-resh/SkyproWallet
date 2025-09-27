<template>
  <div class="tbl__expens">
    <h2 class="tbl__ttl">Таблица расходов</h2>
    di
    <table class="expenses-table">
      <thead>
        <tr class="expenses-table__columns">
          <th class="description">Описание</th>
          <th class="category">Категория</th>
          <th class="date">Дата</th>
          <th class="amount">Сумма</th>
          <th class="action"></th>
        </tr>
      </thead>
      <!-- <div class="border"></div> -->

      <tbody>
        <tr v-for="item in expenses" :key="item.id">
          <td class="description">{{ item.description }}</td>
          <td class="category">{{ item.category }}</td>
          <td class="date">{{ formatDate(item.date) }}</td>
          <td class="amount">{{ item.amount }}</td>
          <td class="action-col">
            <button class="delete-btn" @click="removeExpense(item.id)">
              <svg viewBox="0 0 12 12" width="12" height="12" fill="none">
                <g>
                  <path
                    d="M9.62 2.79003L9.42 2.79003L7.73 1.10003C7.595 0.965029 7.375 0.965029 7.235 1.10003C7.1 1.23503 7.1 1.45503 7.235 1.59503L8.43 2.79003L3.57 2.79003L4.765 1.59503C4.9 1.46003 4.9 1.24003 4.765 1.10003C4.63 0.965029 4.41 0.965029 4.27 1.10003L2.585 2.79003L2.385 2.79003C1.935 2.79003 1 2.79003 1 4.07003C1 4.55503 1.1 4.87503 1.31 5.08503C1.43 5.21003 1.575 5.27503 1.73 5.31003C1.875 5.34503 2.03 5.35003 2.18 5.35003L9.82 5.35003C9.975 5.35003 10.12 5.34003 10.26 5.31003C10.68 5.21003 11 4.91003 11 4.07003C11 2.79003 10.065 2.79003 9.62 2.79003Z"
                    fill="#999999"
                  />
                  <path
                    d="M9.52502 6L2.43502 6C2.12502 6 1.89002 6.275 1.94002 6.58L2.36002 9.15C2.50002 10.01 2.87502 11 4.54002 11L7.34502 11C9.03002 11 9.33002 10.155 9.51002 9.21L10.015 6.595C10.075 6.285 9.84002 6 9.52502 6ZM5.30502 9.225C5.30502 9.42 5.15002 9.575 4.96002 9.575C4.76502 9.575 4.61002 9.42 4.61002 9.225L4.61002 7.575C4.61002 7.385 4.76502 7.225 4.96002 7.225C5.15002 7.225 5.30502 7.385 5.30502 7.575L5.30502 9.225ZM7.44502 9.225C7.44502 9.42 7.29002 9.575 7.09502 9.575C6.90502 9.575 6.74502 9.42 6.74502 9.225L6.74502 7.575C6.74502 7.385 6.90502 7.225 7.09502 7.225C7.29002 7.225 7.44502 7.385 7.44502 7.575L7.44502 9.225Z"
                    fill="#999999"
                  />
                </g>
              </svg>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const expenses = ref([
  { id: 1, description: 'Описание', category: 'Еда', date: '07.09.25', amount: 250 },
  { id: 2, description: 'Описание', category: 'Транспорт', date: '10.09.25', amount: 60 },
  { id: 3, description: 'Описание', category: 'Другое', date: '15.09.25', amount: 500 },
  { id: 1, description: 'Описание', category: 'Еда', date: '07.09.25', amount: 250 },
  { id: 2, description: 'Описание', category: 'Транспорт', date: '10.09.25', amount: 60 },
  { id: 3, description: 'Описание', category: 'Другое', date: '15.09.25', amount: 500 },
  { id: 1, description: 'Описание', category: 'Еда', date: '07.09.25', amount: 250 },
  { id: 2, description: 'Описание', category: 'Транспорт', date: '10.09.25', amount: 60 },
])

function removeExpense(id) {
  expenses.value = expenses.value.filter((exp) => exp.id !== id)
}

function formatDate(date) {
  return new Date(date).toLocaleDateString('ru-RU')
}
</script>

<style lang="scss">
.tbl__ttl {
  padding: 32px;
  font-size: 24px;
  font-weight: 700;
}
.expenses-table {
  width: 723px;
  table-layout: fixed;
}
.expenses-table__columns {
  font-size: 12px;
  color: #999999;
  width: 723px;
  padding-left: 32px;
  padding-right: 32px;
}
th.description,
td.description {
  width: 141px;
}
th.category,
td.category {
  width: 141px;
}
th.date,
td.date {
  width: 112px;
}
th.amount,
td.amount {
  width: 92px;
}
th.action,
td.action-col {
  width: 40px;
}

.border {
  width: 789px;
  padding-left: 0px;
  padding-top: 5.75px;
  border-bottom: 0.5px solid rgba(153, 153, 153, 1);
}

.expenses-table-scroll {
  padding-left: 32px;
  padding-right: 32px;
  height: 504px;
  width: 789px;
  overflow-y: auto;
  scrollbar-gutter: stable;
  font-size: 12px;
  font-weight: 400;
}

.expenses-table-scroll::-webkit-scrollbar {
  width: 6px;
}
.expenses-table-scroll::-webkit-scrollbar-thumb {
  border-radius: 30px;
  height: 100px;
  background: #bbb;
}
.expenses-table-scroll::-webkit-scrollbar-track {
  background: transparent;
  border-radius: 30px;
}
.expens-columns {
  color: #000000;
  font-size: 12px;
}
</style>
