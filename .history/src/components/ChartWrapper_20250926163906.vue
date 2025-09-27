<template>
  <div class="expenses-graph">
    <!-- Общая сумма -->
    <div class="total-amount">
      <span class="total-amount__sum">{{ totalAmount.toLocaleString() }}</span>
      <span class="total-amount__currency">руб.</span>
    </div>
    <!-- Период -->
    <div class="period-label">
      Расходы за {{ periodLabel }}
    </div>
    <!-- График -->
    <div class="bars">
      <div
        class="bar"
        v-for="(cat, i) in categories"
        :key="cat.key"
      >
        <div class="bar__sum">{{ categorySums[cat.key] || 0 }}</div>
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
  { key: 'food', title: 'Еда', color: '#4B8EFF' },
  { key: 'transport', title: 'Транспорт', color: '#FFB14B' },
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
      .filter(e => e.category === cat.key)
      .reduce((sum, e) => sum + e.amount, 0)
  }
  return sums
})

const totalAmount = computed(() => Object.values(categorySums.value).reduce((a, b) => a + b, 0))

const getBarHeight = (catKey) => {
  const max = Math.max(...Object.values(categorySums.value), 1)
  return Math.round((categorySums.value[catKey
