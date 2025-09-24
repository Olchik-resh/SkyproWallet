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
    icon: `<svg viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="14.000000" height="14.000000" fill="none" customFrame="#000000">
	<g id="car">
		<path id="Vector" d="M12.6875 4.66671C12.6875 4.90588 12.4892 5.10421 12.25 5.10421L1.75 5.10421C1.51083 5.10421 1.3125 4.90588 1.3125 4.66671C1.3125 4.42755 1.51083 4.22921 1.75 4.22921L2.345 4.22921L2.56667 3.17338C2.77667 2.15255 3.21417 1.21338 4.9525 1.21338L9.0475 1.21338C10.7858 1.21338 11.2233 2.15255 11.4333 3.17338L11.655 4.22921L12.25 4.22921C12.4892 4.22921 12.6875 4.42755 12.6875 4.66671Z" fill="rgb(0,0,0)" fill-rule="nonzero" />
		<path id="Vector" d="M12.9383 7.96817C12.8508 7.00567 12.5942 5.979 10.7217 5.979L3.27834 5.979C1.40584 5.979 1.15501 7.00567 1.06168 7.96817L0.735009 11.5207C0.694176 11.964 0.840009 12.4073 1.14334 12.7398C1.45251 13.0782 1.89001 13.2707 2.35668 13.2707L3.45334 13.2707C4.39834 13.2707 4.57918 12.7282 4.69584 12.3723L4.81251 12.0223C4.94668 11.6198 4.98168 11.5207 5.50668 11.5207L8.49334 11.5207C9.01834 11.5207 9.03584 11.579 9.18751 12.0223L9.30418 12.3723C9.42084 12.7282 9.60168 13.2707 10.5467 13.2707L11.6433 13.2707C12.1042 13.2707 12.5475 13.0782 12.8567 12.7398C13.16 12.4073 13.3058 11.964 13.265 11.5207L12.9383 7.96817ZM5.25001 9.18734L3.50001 9.18734C3.26084 9.18734 3.06251 8.989 3.06251 8.74984C3.06251 8.51067 3.26084 8.31234 3.50001 8.31234L5.25001 8.31234C5.48918 8.31234 5.68751 8.51067 5.68751 8.74984C5.68751 8.989 5.48918 9.18734 5.25001 9.18734ZM10.5 9.18734L8.75001 9.18734C8.51084 9.18734 8.31251 8.989 8.31251 8.74984C8.31251 8.51067 8.51084 8.31234 8.75001 8.31234L10.5 8.31234C10.7392 8.31234 10.9375 8.51067 10.9375 8.74984C10.9375 8.989 10.7392 9.18734 10.5 9.18734Z" fill="rgb(0,0,0)" fill-rule="nonzero" />
		<path id="Vector" opacity="0" transform="matrix(-1,-1.22465e-16,1.22465e-16,-1,14,14)" />
	</g>
</svg>
`,
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
