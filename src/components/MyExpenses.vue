<template>
  <div class="expens__conteiner">
    <h1 class="text-ttl">Мои расходы</h1>
    <div class="tbl">
      <div class="tbl__expens">
        <TblExpenses :expenses="filteredExpenses" @remove-expense="removeExpense" />
      </div>
      <div class="tbl__new-expens">
        <NewExpensesForm
          @add-expense="
            (v) => {
              addExpense(v)
            }
          "
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useExpenses } from '../services/useExpenses.js'
import NewExpensesForm from './NewExpensesForm.vue'
import TblExpenses from './TblExpenses.vue'
import { onMounted, onActivated } from 'vue'

const { addExpense, removeExpense, filteredExpenses, fetchExpenses } = useExpenses()

onMounted(fetchExpenses)
onActivated(fetchExpenses)
</script>

<style lang="scss">
table {
  border-spacing: 0px;
}
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
  width: 1200px;
  margin-top: 32px;
  display: flex;
  gap: 34px;
  flex-direction: row;
  flex-wrap: nowrap;
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
</style>
