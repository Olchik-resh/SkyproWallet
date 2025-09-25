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

const monthsCount = 13
const monthsArray = Array.from({ length: monthsCount }, (_, idx) =>
  dayjs().startOf('month').add(idx, 'month'),
)

function getCalendarMatrix(month) {
  const matrix = []
  const firstDay = month.startOf('month')
  const daysInMonth = month.daysInMonth()
  const weekDayOfFirst = (firstDay.day() + 6) % 7 // 0 - ПН, 6 - ВС

  let dayCounter = 1
  for (let w = 0; w < 6; w++) {
    const week = []
    for (let d = 0; d < 7; d++) {
      if (w === 0 && d < weekDayOfFirst) {
        week.push({ day: '', isCurrentMonth: false })
      } else if (dayCounter > daysInMonth) {
        week.push({ day: '', isCurrentMonth: false })
      } else {
        week.push({ day: dayCounter, isCurrentMonth: true })
        dayCounter++
      }
    }
    matrix.push(week)
    if (dayCounter > daysInMonth) break
  }
  return matrix
}
</script>

<style lang="scss">
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
  scrollbar-width: thin;
  scrollbar-gutter: stable;
}
.months-scroll-wrapper::-webkit-scrollbar {
  width: 6px;
}
.months-scroll-wrapper::-webkit-scrollbar-track {
  background: rgba(217, 217, 217, 1);
  border-radius: 30px;
}
.months-scroll-wrapper::-webkit-scrollbar-thumb {
  border-radius: 30px;
  height: 100px;
  background: #bbb;
}
.months-scroll-wrapper::-webkit-scrollbar-corner {
  background: rgba(217, 217, 217, 1);
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
  width: 316px;
  height: 224px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-content: center;
  justify-content: flex-start;
  align-items: stretch;
  
}

.calendar-table thead tr {
  position: sticky;
  top: 0;
  background: #f8fafc;
  z-index: 1;
}

.calendar-day {
  width: 40px;
  height: 40px;
  padding: 10px 15px 10px 15px;
  border-radius: 60px;
  background: rgba(244, 245, 246, 1);
}

.calendar-day.other-month {
  color: #bdbdbd;
  background: #f7f7f7;
}
</style>
