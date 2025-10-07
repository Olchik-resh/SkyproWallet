<template>
  <div class="expenses-graph">
    <div class="total-amount">
      <span class="total-amount__sum">{{ totalAmount.toLocaleString() }}</span>
      <span class="total-amount__currency">₽</span>
    </div>

    <div class="period-label">Расходы за {{ periodLabel }}</div>

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
import dayjs from 'dayjs'

const props = defineProps({
  periodStart: Object,
  periodEnd: Object,
  allExpenses: {
    type: Array,
    required: true,
  },
})

const categories = [
  { key: 'food', title: 'Еда', color: '#D9B6FF' },
  { key: 'transport', title: 'Транспорт', color: '#FFB53D' },
  { key: 'home', title: 'Жилье', color: '#6EE4FE' },
  { key: 'entertainment', title: 'Развлечения', color: '#B0AEFF' },
  { key: 'education', title: 'Образование', color: '#BCEC30' },
  { key: 'other', title: 'Другое', color: '#FFB9B8' },
]

const expenses = computed(() => {
  const items = props.allExpenses || []
  if (!props.periodStart || !props.periodEnd) return items
  return items.filter((e) => {
    const date = dayjs(e.date)
    return (
      date.isSameOrAfter(props.periodStart, 'day') && date.isSameOrBefore(props.periodEnd, 'day')
    )
  })
})

const periodLabel = computed(() => {
  if (!props.periodStart || !props.periodEnd) return 'все время'

  return `${dayjs(props.periodStart).format('DD MMMM')} – ${dayjs(props.periodEnd).format('DD MMMM YYYY')}`
})

const categorySums = computed(() => {
  const sums = {}
  for (const cat of categories) {
    sums[cat.key] = expenses.value
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
  height: 387px;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
}
.bar__sum {
  margin-bottom: 12px;
  color: rgba(0, 0, 0, 1);
  font-size: 16px;
  font-weight: 600;
}
.bar__column {
  width: 94px;
  height: 387px;
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
