<template>
  <div class="expens__conteiner">
    <h1 class="text-ttl">Мои расходы</h1>
    <div class="tbl">
      <div class="tbl__expens">
        <h2 class="tbl__ttl">Таблица расходов</h2>
        <table class="expenses-table">
          <thead>
            <tr class="expenses-table__columns">
              <th class="description">Описание</th>
              <th class="category">Категория</th>
              <th class="date">Дата</th>
              <th class="amount">Сумма</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in expenses" :key="item.id">
              <td>{{ item.description }}</td>
              <td>{{ item.category }}</td>
              <td>{{ formatDate(item.date) }}</td>
              <td>{{ item.amount }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="tbl__new-expens">
        <h2 class="tbl__ttl">Новый расход</h2>
        <table>
          <!-- Здесь будет форма для добавления нового расхода -->
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
// import { ref } from 'vue'

// const expenses = ref([
//   { id: 1, description: '', category: '', date: '', amount: 250 },
//   { id: 2, description: '', category: '', date: '', amount: 60 },
//   { id: 3, description: '', category: '', date: '', amount: 500 },
// ])

function formatDate(date) {
  return new Date(date).toLocaleDateString('ru-RU')
}
</script>

<style lang="css">
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
  height: 618px;
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
}
.expenses-table {
  padding-left: 32px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: center;
  justify-content: space-between;
}
descriptionХ
</style>
