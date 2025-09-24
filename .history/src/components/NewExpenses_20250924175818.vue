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
          :key="cat.name"
          type="button"
          class="category-btn"
          :class="{ active: form.category === cat.name }"
          @click="form.category = cat.name"
        >
          <span class="cat-icon" v-html="cat.icon"></span>
          <span>{{ cat.name }}</span>
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

const categories = [
  {
    name: 'Еда',
    icon: `<svg viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="14.000000" height="14.000000" fill="none" customFrame="#000000">
	<g id="bag">
		<path id="Vector" d="M11.2234 3.25507L10.99 3.25507L9.01835 1.28341C8.86086 1.12591 8.60419 1.12591 8.44086 1.28341C8.28335 1.44091 8.28335 1.69757 8.44086 1.86091L9.83502 3.25507L4.16502 3.25507L5.55919 1.86091C5.71669 1.70341 5.71669 1.44674 5.55919 1.28341C5.40169 1.12591 5.14502 1.12591 4.98169 1.28341L3.01585 3.25507L2.78252 3.25507C2.25752 3.25507 1.16669 3.25507 1.16669 4.74841C1.16669 5.31424 1.28335 5.68757 1.52835 5.93257C1.66835 6.07841 1.83752 6.15424 2.01835 6.19507C2.18752 6.23591 2.36835 6.24174 2.54335 6.24174L11.4567 6.24174C11.6375 6.24174 11.8067 6.23007 11.97 6.19507C12.46 6.07841 12.8334 5.72841 12.8334 4.74841C12.8334 3.25507 11.7425 3.25507 11.2234 3.25507Z" fill="rgb(0,0,0)" fill-rule="nonzero" />
		<path id="Vector" d="M11.1126 7L2.8409 7C2.47924 7 2.20507 7.32083 2.2634 7.67667L2.7534 10.675C2.91674 11.6783 3.35424 12.8333 5.29674 12.8333L8.56924 12.8333C10.5351 12.8333 10.8851 11.8475 11.0951 10.745L11.6842 7.69417C11.7542 7.3325 11.4801 7 11.1126 7ZM6.18924 10.7625C6.18924 10.99 6.0084 11.1708 5.78674 11.1708C5.55924 11.1708 5.3784 10.99 5.3784 10.7625L5.3784 8.8375C5.3784 8.61583 5.55924 8.42917 5.78674 8.42917C6.0084 8.42917 6.18924 8.61583 6.18924 8.8375L6.18924 10.7625ZM8.6859 10.7625C8.6859 10.99 8.50507 11.1708 8.27757 11.1708C8.0559 11.1708 7.86924 10.99 7.86924 10.7625L7.86924 8.8375C7.86924 8.61583 8.0559 8.42917 8.27757 8.42917C8.50507 8.42917 8.6859 8.61583 8.6859 8.8375L8.6859 10.7625Z" fill="rgb(0,0,0)" fill-rule="nonzero" />
		<path id="Vector" opacity="0" transform="matrix(-1,-1.22465e-16,1.22465e-16,-1,14,14)" />
	</g>
</svg>
`,
  },
  {
    name: 'Транспорт',
    icon: ``,
  },
  {
    name: 'Жилье',
    icon: ``,
  },
  {
    name: 'Развлечения',
    icon: ``,
  },
  {
    name: 'Образование',
    icon: ``,
  },
  {
    name: 'Другое',
    icon: ``,
  },
]

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
