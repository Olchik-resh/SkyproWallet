<template>
  <div class="expens__conteiner">
    <h1 class="text-ttl">Мои расходы</h1>
    <div class="tbl">
      <div class="tbl__expens">
        <h2 class="tbl__ttl">Таблица расходов</h2>
        <div class="expenses-table-scroll">
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
            <tbody class="expens-columns">
              <tr v-for="item in expenses" :key="item.id">
                <td class="description">{{ item.description }}</td>
                <td class="category">{{ item.category }}</td>
                <td class="date">{{ formatDate(item.date) }}</td>
                <td class="amount">{{ item.amount }}</td>
                <td class="action-col">
                  <button class="delete-btn" @click="removeExpense(item.id)">
                    <!-- SVG ... -->
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="tbl__new-expens">
        <NewExpenses />
      </div>
    </div>
  </div>
</template>

<script setup>
import NewExpenses from './NewExpenses.vue'
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
table {
  border-spacing: 0px;
}
.expens__conteiner {
  margin-left: 120px;
  padding-top: 36px;
  margin-right: 120px;
  margin-bottom: 80px;
}
.text-ttl {
  color: rgba(0, 0, 0, 1);
  font-size: 32px;
  font-weight: 700;
}

.tbl {
  margin-top: 32px;
  display: flex;
  gap: 34px;
  flex-direction: row;
  flex-wrap: nowrap;
  /* align-content: stretch; */
  justify-content: flex-start;
  align-items: stretch;
}

.tbl__expens {
  width: 789px;
  height: 618px;
  border-radius: 30px;
  box-shadow: 0px 20px 67px -12px rgba(0, 0, 0, 0.13);
  background: rgba(255, 255, 255, 1);
}
.tbl__new-expens {
  width: 379px;
  height: 100%;
  border-radius: 30px;
  box-shadow: 0px 20px 67px -12px rgba(0, 0, 0, 0.13);
  background: rgba(255, 255, 255, 1);
}

.tbl__ttl {
  padding: 32px;
  font-size: 24px;
  font-weight: 700;
}

.expenses-table__columns {
  display: flex;
  gap: 32px;
  font-size: 12px;
  color: #999999;
  padding-left: 32px;
}
.expenses-table {
  flex-direction: row;
  flex-wrap: wrap;
  align-content: center;
  justify-content: space-between;
}
.description {
  width: 141px;
  display: flex;
  justify-content: flex-start;
}
.category {
  width: 141px;
  display: flex;
  justify-content: flex-start;
}
.date {
  width: 142px;
  display: flex;
  justify-content: flex-start;
}
.amount {
  width: 134px;
  display: flex;
  justify-content: flex-start;
}
.border {
  width: 789px;
  padding-left: 0px;
  padding-top: 5.75px;
  border-bottom: 0.5px solid rgba(153, 153, 153, 1);
}

.expenses-table-scroll {
  padding-left: 32px;
  height: 504px;
  width: 789px;
  overflow-y: auto;
  scrollbar-gutter: stable;
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
  display: flex;
}

tr {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: stretch;
  justify-content: space-evenly;
  align-items: flex-end;
  width: 789px;
  gap: 32px;
}
</style>
