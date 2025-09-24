<template>
  <div class="tbl__new-expens">
    <h2 class="tbl__ttl">Новый расход</h2>

    <form class="expense-form" @submit.prevent="addExpense">
      <!-- Описание -->
      <label class="expense-label">Описание</label>
      <input
        v-model="form.description"
        type="text"
        class="expense-input"
        placeholder="Введите описание"
        required
      />

      <!-- Категория -->
      <label class="expense-label">Категория</label>
      <div class="categories-grid">
        <button
          v-for="cat in categories"
          :key="cat"
          type="button"
          class="category-btn"
          :class="{ active: form.category === cat }"
          @click="form.category = cat"
        >
          {{ cat }}
        </button>
      </div>

      <!-- Дата -->
      <label class="expense-label">Дата</label>
      <input v-model="form.date" type="date" class="expense-input" required />

      <!-- Сумма -->
      <label class="expense-label">Сумма</label>
      <input
        v-model="form.amount"
        type="number"
        class="expense-input"
        min="1"
        required
        placeholder="0"
      />

      <!-- Кнопка добавить -->
      <button type="submit" class="add-btn">Добавить новый расход</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const categories = ['Еда', 'Транспорт', 'Жилье', 'Развлечения', 'Образование', 'Другое']

const form = ref({
  description: '',
  category: '',
  date: '',
  amount: '',
})

function addExpense() {

  alert('Расход добавлен: ' + JSON.stringify(form.value))

  form.value = {
    description: '',
    category: '',
    date: '',
    amount: '',
  }
}
</script>

<style scoped>
.tbl__ttl {
  padding-left: 32px;
  padding-top: 32px;
  padding-bottom: 24px;
  font-size: 24px;
  font-weight: 700;
}
.expense-form {
  display: flex;
  flex-direction: column;
  padding: 0 32px;
}

.expense-label {
  font-size: 16px;
  font-weight: 600;
}

.expense-input {
  margin-top: 16px;
  margin-bottom: 24px;
  padding: 12px;
  font-size: 12px;
  border: 0.5px solid rgba(153, 153, 153, 1);
  border-radius: 6px;
  color: rgba(153, 153, 153, 1);
  font-family: Montserrat;
}

.categories-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px;
  margin-bottom: 24px;
  padding-top: 16px;
}

.category-btn {
  padding: 8px 20px;
  font-size: 12px;
  border-radius: 30px;
  background: rgba(244, 245, 246, 1);
  border: none;
  cursor: pointer;

  transition:
    background 0.2s,
    color 0.2s;
}

.category-btn.active {
  background: #f1ebfd;
  color: rgba(115, 52, 234, 1);
}

.add-btn {
  padding: 12px;
  font-size: 12px;
  color: #fff;
  border: none;
  border-radius: 6px;
  background: rgba(115, 52, 234, 1);
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 32px;
  transition: background 0.2s;
}

.add-btn:hover {
  background: #5e1acc;
}
</style>
