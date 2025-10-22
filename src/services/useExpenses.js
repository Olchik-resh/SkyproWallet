import { ref, watch, computed, inject } from 'vue'
import dayjs from 'dayjs'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import { getTransactions, addTransaction, deleteTransaction } from '@/services/transactions'

dayjs.extend(isSameOrAfter)
dayjs.extend(isSameOrBefore)

function loadPeriod(key) {
  const val = localStorage.getItem(key)
  return val && val !== 'null' && val !== '' ? val : null
}

const expenses = ref([])
const periodStart = ref(loadPeriod('periodStart'))
const periodEnd = ref(loadPeriod('periodEnd'))

watch(periodStart, (val) => {
  localStorage.setItem('periodStart', val ? dayjs(val).format('YYYY-MM-DD') : '')
})
watch(periodEnd, (val) => {
  localStorage.setItem('periodEnd', val ? dayjs(val).format('YYYY-MM-DD') : '')
})

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
  const auth = inject('auth')


  async function fetchExpenses() {
    if (!auth?.token) {
      expenses.value = []
      return
    }
    try {
      const result = await getTransactions(auth.token)
      expenses.value = Array.isArray(result) ? result : []
    } catch (err) {
      expenses.value = []
      console.error('Ошибка загрузки расходов:', err)
    }
  }

  async function addExpense(expense) {
    if (!auth?.token) return
    try {
      await addTransaction(auth.token, expense)
      await fetchExpenses()
    } catch (err) {
      console.error('Ошибка добавления расхода:', err)
    }
  }

  async function removeExpense(id) {
    if (!auth?.token) return
    try {
      await deleteTransaction(auth.token, id)
      await fetchExpenses()
    } catch (err) {
      console.error('Ошибка удаления расхода:', err)
    }
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
    fetchExpenses,
  }
}
