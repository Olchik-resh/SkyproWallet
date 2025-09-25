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
  <div class="calendar-outer">
    <div class="calendar__header">
      <button @click="prevMonth">&lt;</button>
      <span class="calendar__month">{{ currentMonthFormatted }}</span>
      <button @click="nextMonth">&gt;</button>
    </div>
    <table class="calendar">
      <thead>
        <tr>
          <th v-for="day in weekDays" :key="day" class="weekday">{{ day }}</th>
        </tr>
      </thead>
    </table>
    <!-- Прокручиваемая часть -->
    <div class="calendar__scroll" ref="scrollRef">
      <table class="calendar">
        <tbody>
          <tr v-for="(week, i) in calendarMatrix" :key="i">
            <td
              v-for="(cell, j) in week"
              :key="j"
              :class="['calendar__cell', cell.isCurrentMonth ? '' : 'calendar__cell--other']"
            >
              {{ cell.day }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import dayjs from 'dayjs'
import 'dayjs/locale/ru'
dayjs.locale('ru')

const weekDays = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС']

const currentMonth = ref(dayjs().startOf('month'))

const currentMonthFormatted = computed(() =>
  currentMonth.value.format('MMMM YYYY').replace(/^./, (m) => m.toUpperCase()),
)

function prevMonth() {
  currentMonth.value = currentMonth.value.subtract(1, 'month')
}
function nextMonth() {
  currentMonth.value = currentMonth.value.add(1, 'month')
}

// Генерируем матрицу календаря для отображения
const calendarMatrix = computed(() => {
  const matrix = []
  const firstDay = currentMonth.value.startOf('month')
  const lastDay = currentMonth.value.endOf('month')
  // dayjs .day() для ПН=1 … ВС=0, но нам нужно с ПН=0
  const prevDays = (firstDay.day() + 6) % 7
  let start = firstDay.subtract(prevDays, 'day')
  for (let w = 0; w < 6; w++) {
    const week = []
    for (let d = 0; d < 7; d++) {
      week.push({
        day: start.date(),
        isCurrentMonth: start.month() === currentMonth.value.month(),
      })
      start = start.add(1, 'day')
    }
    matrix.push(week)
    // Если следующая неделя полностью вне текущего месяца — не показываем её
    if (start.isAfter(lastDay) && start.day() === 1) break
  }
  return matrix
})
</script>

<style scoped>
.calendar-outer {
  width: 350px;
  margin: 0 auto;
}
.calendar__header {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
}
.calendar__month {
  flex: 1;
  text-align: center;
  font-weight: bold;
  font-size: 18px;
}
.calendar {
  width: 100%;
  border-collapse: collapse;
}
.weekday {
  text-align: center;
  font-weight: 600;
  padding: 6px 0;
  background: #f8fafc;
  position: sticky;
  top: 0;
  z-index: 2;
}
.calendar__scroll {
  max-height: 210px;
  overflow-y: auto;
  border-top: 1px solid #eee;
}
.calendar__cell {
  width: 42px;
  height: 32px;
  text-align: center;
  border: 1px solid #eee;
  background: #fff;
  color: #222;
}
.calendar__cell--other {
  color: #bbb;
  background: #fafafa;
}
</style>
