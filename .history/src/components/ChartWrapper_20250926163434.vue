<template>
  <div class="chart-wrapper">
    <!-- Сумма за период -->
    <div class="chart-total">
      Сумма за период: <b>{{ totalSum }}</b>
    </div>
    <!-- График -->
    <div class="chart-bars">
      <div v-for="cat in categories" :key="cat.key" class="chart-bar">
        <div class="chart-bar__inner" :style="{ height: getBarHeight(cat.key) + '%' }">
          <span class="chart-bar__value">
            {{ categorySums[cat.key] || 0 }}
          </span>
        </div>
        <div class="chart-bar__label">
          {{ cat.title }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

// Категории
const categories = [
  { key: 'food', title: 'Еда' },
  { key: 'transport', title: 'Транспорт' },
  { key: 'home', title: 'Жилье' },
  { key: 'entertainment', title: 'Развлечения' },
  { key: 'education', title: 'Образование' },
  { key: 'other', title: 'Другое' },
]

// Пример входных данных (замените на свои)
const expenses = ref([
  { category: 'food', amount: 1000 },
  { category: 'transport', amount: 600 },
  { category: 'home', amount: 2000 },
  { category: 'entertainment', amount: 400 },
  { category: 'education', amount: 900 },
  { category: 'other', amount: 300 },
])

// Сумма по категориям
const categorySums = computed(() => {
  const sums = {}
  for (const cat of categories) {
    sums[cat.key] = expenses.value
      .filter((e) => e.category === cat.key)
      .reduce((sum, e) => sum + e.amount, 0)
  }
  return sums
})

// Общая сумма
const totalSum = computed(() => Object.values(categorySums.value).reduce((a, b) => a + b, 0))

// Высота столбика (в процентах от максимального)
const getBarHeight = (catKey) => {
  const max = Math.max(...Object.values(categorySums.value), 1)
  return Math.round((categorySums.value[catKey] / max) * 100)
}
</script>

<style scoped>
.chart-wrapper {
  max-width: 560px;
  margin: 0 auto;
}
.chart-total {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
}
.chart-bars {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  height: 180px;
  gap: 18px;
}
.chart-bar {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.chart-bar__inner {
  width: 38px;
  background: #4b8eff;
  border-radius: 8px 8px 0 0;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  transition: height 0.3s;
  position: relative;
}
.chart-bar__value {
  position: absolute;
  top: -28px;
  left: 50%;
  transform: translateX(-50%);
  color: #222;
  font-size: 13px;
  font-weight: bold;
}
.chart-bar__label {
  margin-top: 8px;
  font-size: 14px;
  color: #555;
  text-align: center;
  min-height: 38px;
}
</style>
