<!-- <template>
  <table class="cost-period">
    <thead>
      <tr class="cost-tbl__columns">
        <th class="weekday">ПН</th>
        <th class="weekday">ВТ</th>
        <th class="weekday">СР</th>
        <th class="weekday">ЧТ</th>
        <th class="weekday">ПТ</th>
        <th class="weekday">СБ</th>
        <th class="weekday">ВС</th>
      </tr>
      <div class="cost-border"></div>
    </thead>
    <div class="calendar__month">{{ currentMonthFormatted }}</div>
  </table>
</template>

<script setup>
import { computed, ref } from 'vue'
import dayjs from 'dayjs'
import 'dayjs/locale/ru'

dayjs.locale('ru')

const currentMonth = ref(dayjs())
const currentMonthFormatted = computed(() =>
  currentMonth.value.format('MMMM YYYY').replace(/^./, (m) => m.toUpperCase()),
)
</script>

<style lang="scss">
table {
  border-spacing: 0px;
}

.cost-tbl__columns {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
  width: 379px;
}
.weekday {
  font-size: 12px;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
}

.cost-border {
  padding-left: 0px;
  padding-top: 5.75px;
  border-bottom: 0.5px solid rgba(153, 153, 153, 1);
}
</style> -->
<template>
  <thead>
    <tr class="cost-tbl__columns">
      <th class="weekday">ПН</th>
      <th class="weekday">ВТ</th>
      <th class="weekday">СР</th>
      <th class="weekday">ЧТ</th>
      <th class="weekday">ПТ</th>
      <th class="weekday">СБ</th>
      <th class="weekday">ВС</th>
    </tr>
    <div class="cost-border"></div>
  </thead>
  <div class="months-scroll-wrapper">
    <div class="months-list">
      <div v-for="month in monthsArray" :key="month.format('YYYY-MM')" class="calendar-month-block">
        <div class="calendar__month-label">
          {{ month.format('MMMM YYYY').replace(/^./, (m) => m.toUpperCase()) }}
        </div>
        <table class="calendar-table">
          <tbody>
            <tr v-for="(week, wIdx) in getCalendarMatrix(month)" :key="wIdx">
              <td
                v-for="(cell, dIdx) in week"
                :key="dIdx"
                :class="['calendar-day', { 'other-month': !cell.isCurrentMonth }]"
              >
                {{ cell.day }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import dayjs from 'dayjs'
import 'dayjs/locale/ru'
dayjs.locale('ru')

// Сколько месяцев выводить в ленте (например, текущий+6 вперёд+6 назад)
const monthsCount = 13
const currentMonthIdx = 6 // где находится текущий месяц

const monthsArray = Array.from({ length: monthsCount }, (_, idx) =>
  dayjs()
    .startOf('month')
    .add(idx - currentMonthIdx, 'month'),
)

// Функция генерации матрицы месяца
function getCalendarMatrix(month) {
  const matrix = []
  const firstDay = month.startOf('month')
  const lastDay = month.endOf('month')
  const prevDays = (firstDay.day() + 6) % 7
  let start = firstDay.subtract(prevDays, 'day')
  for (let w = 0; w < 6; w++) {
    const week = []
    for (let d = 0; d < 7; d++) {
      week.push({
        day: start.date(),
        isCurrentMonth: start.month() === month.month(),
      })
      start = start.add(1, 'day')
    }
    matrix.push(week)
    if (start.isAfter(lastDay) && start.day() === 1) break
  }
  return matrix
}
</script>

<style scoped lang="scss">
.cost-tbl__columns {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
  width: 379px;
}
.weekday {
  font-size: 12px;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
}

.cost-border {
  padding-left: 0px;
  padding-top: 5.75px;
  border-bottom: 0.5px solid rgba(153, 153, 153, 1);
}

.months-scroll-wrapper {
  height: 396px;
  overflow-y: auto;
  direction: ltr;


  scrollbar-width: thin;
  scrollbar-color: rgba(80, 80, 80, 0.9) rgba(217, 217, 217, 1);
  scrollbar-gutter: stable;
}




.months-scroll-wrapper::-webkit-scrollbar {
  width: 6px;
}


.months-scroll-wrapper::-webkit-scrollbar-track {
  background: rgba(217, 217, 217, 1);
  border-radius: 30px;
}


.months-scroll-wrapper::-webkit-scrollbar-button {
  display: none;
  height: 0;
  width: 0;
}


.months-scroll-wrapper::-webkit-scrollbar-corner {
  background: rgba(217, 217, 217, 1);
}


.months-scroll-wrapper::-webkit-scrollbar-thumb {
  background: rgba(80, 80, 80, 0.9);
  border-radius: 30px;
  min-height: 100px; /* минимальная высота ползунка (WebKit) */
  border: 2px solid rgba(217, 217, 217, 1); /* визуальный отступ */
}

/* hover/active состояния */
.months-scroll-wrapper::-webkit-scrollbar-thumb:hover {
  background: rgba(60, 60, 60, 0.95);
}
.months-scroll-wrapper::-webkit-scrollbar-thumb:active {
  background: rgba(40, 40, 40, 1);
}

.months-list {
  direction: ltr;
  padding-left: 32px;
  padding-right: 32px;
}

.calendar-month-block {
  margin-bottom: 24px;
}

.calendar__month-label {
  font-size: 16px;
  font-weight: 600;
  margin: 24px 0 12px 0;
  color: rgba(0, 0, 0, 1);
}

.calendar-table {
  width: 100%;
  border-collapse: collapse;
  background: #fff;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.04);
}

.calendar-table thead tr {
  position: sticky;
  top: 0;
  background: #f8fafc;
  z-index: 1;
}

.calendar-day {
  text-align: center;
  padding: 10px 0;
  min-width: 38px;
  border: 1px solid #f0f0f0;
  font-size: 13px;
  color: #222;
  background: #fff;
  user-select: none;
}

.calendar-day.other-month {
  color: #bdbdbd;
  background: #f7f7f7;
}
</style>
