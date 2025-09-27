<template>
  <div class="expenses-graph">
    <!-- Общая сумма -->
    <div class="total-amount">
      <span class="total-amount__sum">{{ totalAmount.toLocaleString() }}</span>
      <span class="total-amount__currency">₽</span>
    </div>
    <!-- Период -->
    <div class="period-label">Расходы за {{ periodLabel }}</div>
    <!-- График -->
    <div class="bars">
      <div class="bar" v-for="cat in categories" :key="cat.key">
        <div class="bar__sum">
          {{ categorySums[cat.key] || 0 }}
          <span class="total-amount__currency total-amount__currency_mini">₽</span>
        </div>
        <div
          class="bar__column"
          :style="{
            height: getBarHeight(cat.key) + '%',
            background: cat.color,
          }"
        ></div>
        <div class="bar__label">{{ cat.title }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

// Категории и цвета
const categories = [
  { key: 'food', title: 'Еда', color: 'rgba(217, 182, 255, 1);' },
  { key: 'transport', title: 'Транспорт', color: 'rgba(255, 181, 61, 1);' },
  { key: 'home', title: 'Жилье', color: '#FF4B7B' },
  { key: 'entertainment', title: 'Развлечения', color: '#4BFFB1' },
  { key: 'education', title: 'Образование', color: '#B14BFF' },
  { key: 'other', title: 'Другое', color: '#6E7C8A' },
]

// Пример исходных данных (замените на ваши данные!)
const expenses = [
  { category: 'food', amount: 1230 },
  { category: 'transport', amount: 980 },
  { category: 'home', amount: 2130 },
  { category: 'entertainment', amount: 1100 },
  { category: 'education', amount: 450 },
  { category: 'other', amount: 320 },
]

// Входные параметры периода (замените на свои, если надо)
const periodLabel = '01 июня – 07 июня 2024'

// --- Логика для графика ---
const categorySums = computed(() => {
  const sums = {}
  for (const cat of categories) {
    sums[cat.key] = expenses
      .filter((e) => e.category === cat.key)
      .reduce((sum, e) => sum + e.amount, 0)
  }
  return sums
})

const totalAmount = computed(() => Object.values(categorySums.value).reduce((a, b) => a + b, 0))

const getBarHeight = (catKey) => {
  const max = Math.max(...Object.values(categorySums.value), 1)
  return Math.round((categorySums.value[catKey] / max) * 100)
}
</script>

<style scoped>
.expenses-graph {
  max-width: 789px;
  margin: 0 auto;
  padding: 32px;
}

.total-amount {
  padding-bottom: 12px;
}
.total-amount__sum {
  font-size: 24px;
  font-weight: 700;
}
.total-amount__currency {
  font-size: 24px;
  font-weight: 700;
  margin-left: 6px;
}
.total-amount__currency_mini {
  font-size: 16px;
  font-weight: 600;
  margin-left: 0px;
}
.period-label {
  font-size: 12px;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
}

.bars {
  display: flex;
  gap: 32px;
  height: 387px;
  width: 725px;
  margin-top: 18px;
  flex-direction: row;
  justify-content: space-around;
  align-items: flex-end;
}
.bar {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.bar__sum {
  margin-bottom: 12px;
  color: rgba(0, 0, 0, 1);
  font-size: 16px;
  font-weight: 600;
}
.bar__column {
  width: 44px;
  border-radius: 12px 12px 0 0;
  transition: height 0.3s;
  margin-bottom: 12px;
  display: block;
}
.bar__label {
  font-size: 12px;
  font-weight: 400;
  text-align: center;
  color: rgba(0, 0, 0, 1);
}
</style>
