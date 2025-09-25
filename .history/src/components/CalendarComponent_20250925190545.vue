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
  <div class="calendar-wrapper">
    <div class="calendar__month">
      <button @click="prevMonth" class="calendar__nav">&lt;</button>
      <span>{{ currentMonthFormatted }}</span>
      <button @click="nextMonth" class="calendar__nav">&gt;</button>
    </div>
    <div class="calendar-scroll">
      <table class="calendar-table">
        <thead>
          <tr class="table-header">
            <th class="weekday">ПН</th>
            <th class="weekday">ВТ</th>
            <th class="weekday">СР</th>
            <th class="weekday">ЧТ</th>
            <th class="weekday">ПТ</th>
            <th class="weekday">СБ</th>
            <th class="weekday">ВС</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(week, wIdx) in calendarMatrix" :key="wIdx">
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
</template>

<script setup>
import { ref, computed } from 'vue'
import dayjs from 'dayjs'
import 'dayjs/locale/ru'
dayjs.locale('ru')

const currentMonth = ref(dayjs())

const currentMonthFormatted = computed(() =>
  currentMonth.value.format('MMMM YYYY').replace(/^./, (m) => m.toUpperCase()),
)

function prevMonth() {
  currentMonth.value = currentMonth.value.subtract(1, 'month')
}
function nextMonth() {
  currentMonth.value = currentMonth.value.add(1, 'month')
}

// Генерируем матрицу дней (по неделям)
const calendarMatrix = computed(() => {
  const matrix = []
  const firstDay = currentMonth.value.startOf('month')
  const lastDay = currentMonth.value.endOf('month')
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
    if (start.isAfter(lastDay) && start.day() === 1) break
  }
  return matrix
})
</script>

<style lang="scss" scoped>
.calendar-wrapper {
  width: 100%;
  max-width: 420px;
  margin: 0 auto;
}

.calendar__month {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 16px;
  user-select: none;
}

.calendar__nav {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 20px;
  color: #2f80ed;
  padding: 0 8px;
}

.calendar-scroll {
  max-height: 220px; /* Высота, после которой появляется вертикальная прокрутка */
  overflow-y: auto;
  box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  border: 1px solid #eee;
  /* Для отображения полосы прокрутки слева можно использовать direction: rtl на контейнере и таблице,
     но обычно скроллбар всегда слева. Если нужен "особый" стиль слева — уточните.
  */
}

.calendar-table {
  width: 100%;
  border-collapse: collapse;
  background: #fff;
}

.table-header {
  position: sticky;
  top: 0;
  background: #f8fafc;
  z-index: 1;
}

.weekday {
  font-size: 12px;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
  padding: 8px 10px;
  text-align: center;
  background: #f8fafc;
  border-bottom: 1px solid #eee;
}

.calendar-day {
  text-align: center;
  padding: 10px 12px;
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
