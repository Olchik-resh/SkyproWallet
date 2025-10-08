// services/useExpenses.js
import { ref, watch, computed } from 'vue'
import dayjs from 'dayjs'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
dayjs.extend(isSameOrAfter)
dayjs.extend(isSameOrBefore)

const EXPENSES_KEY = 'expenses'

function load() {
  try {
    return JSON.parse(localStorage.getItem(EXPENSES_KEY)) || []
  } catch {
    return []
  }
}

function loadPeriod(key) {
  const val = localStorage.getItem(key)
  return val && val !== 'null' && val !== '' ? val : null
}

const expenses = ref(load())
const periodStart = ref(loadPeriod('periodStart'))
const periodEnd = ref(loadPeriod('periodEnd'))

watch(
  expenses,
  (val) => {
    localStorage.setItem(EXPENSES_KEY, JSON.stringify(val))
  },
  { deep: true },
)

watch(periodStart, (val) => {
  localStorage.setItem('periodStart', val ? dayjs(val).format('YYYY-MM-DD') : '')
})
watch(periodEnd, (val) => {
  localStorage.setItem('periodEnd', val ? dayjs(val).format('YYYY-MM-DD') : '')
})

console.log('periodStart', periodStart.value, 'periodEnd', periodEnd.value)

const filteredExpenses = computed(() => {
  if (!periodStart.value) return expenses.value
  const start = dayjs(periodStart.value)
  const end = dayjs(periodEnd.value || periodStart.value)
  return expenses.value.filter((exp) => {
    const date = dayjs(exp.date)
    return date.isSameOrAfter(start, 'day') && date.isSameOrBefore(end, 'day')
  })
})

export function useExpenses() {
  function addExpense(expense) {
    expenses.value.push(expense)
  }
  function removeExpense(id) {
    expenses.value = expenses.value.filter((e) => e.id !== id)
  }
  function setPeriod(start, end) {
    periodStart.value = start
    periodEnd.value = end
  }

  return {
    expenses,
    addExpense,
    removeExpense,
    periodStart,
    periodEnd,
    setPeriod,
    filteredExpenses,
  }
}
