<template>
  <div class="cost__container">
    <h1 class="text-ttl">Анализ расходов</h1>

    <div class="cost-tbl">
      <div class="cost-tbl__period">
        <h2 class="tbl__ttl">Период</h2>
        <CalendarComponent
          :periodStart="periodStart"
          :periodEnd="periodEnd"
          @update:periodStart="periodStart = $event"
          @update:periodEnd="periodEnd = $event"
        />
      </div>

      <div class="cost-tbl__chart">
        <ChartWrapper
          :periodStart="periodStart"
          :periodEnd="periodEnd"
          :allExpenses="expensesList"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import CalendarComponent from './CalendarComponent.vue'
import ChartWrapper from './ChartWrapper.vue'

const periodStart = ref(null)
const periodEnd = ref(null)
</script>

<style lang="css">
table {
  border-spacing: 0px;
}
.cost__container {
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
.cost-tbl {
  margin-top: 32px;
  display: flex;
  gap: 34px;
  width: 1200px;
}
.cost-tbl__period {
  width: 379px;
  height: 540px;
  border-radius: 30px;
  box-shadow: 0px 20px 67px -12px rgba(0, 0, 0, 0.13);
  background: rgba(255, 255, 255, 1);
}
.cost-tbl__chart {
  width: 789px;
  height: 540px;
  border-radius: 30px;
  box-shadow: 0px 20px 67px -12px rgba(0, 0, 0, 0.13);
  background: rgba(255, 255, 255, 1);
}
.tbl__ttl {
  padding: 32px;
  font-size: 24px;
  font-weight: 700;
}
</style>
