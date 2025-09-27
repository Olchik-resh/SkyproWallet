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
          <tbody class="calendar-table__block">
            <tr
              class="calendar-table__block calendar-table__block_week"
              v-for="(week, wIdx) in getCalendarMatrix(month)"
              :key="wIdx"
            >
              <td
                v-for="(cell, dIdx) in week"
                :key="dIdx"
                :class="[
                  'calendar-day',
                  { 'other-month': !cell.isCurrentMonth },
                  { selected: isSelected(month, cell) },
                ]"
                @click="selectDate(month, cell)"
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
import {}

dayjs.locale('ru')

const selectedDate = ref(null)

const monthsCount = 13
const monthsArray = Array.from({ length: monthsCount }, (_, idx) =>
  dayjs().startOf('month').add(idx, 'month'),
)

function selectDate(month, cell) {
  if (!cell.isCurrentMonth || !cell.day) return
  selectedDate.value = month.date(cell.day).format('YYYY-MM-DD')
}

function isSelected(month, cell) {
  if (!cell.isCurrentMonth || !cell.day) return false
  return selectedDate.value === month.date(cell.day).format('YYYY-MM-DD')
}

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
  justify-content: space-between;
  align-items: center;
  width: 290.8px;
  margin-left: 43.4px;
  margin-right: 44.8px;
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
  width: 379px;
  overflow-y: auto;
  scrollbar-gutter: stable;
}
.months-scroll-wrapper::-webkit-scrollbar {
  width: 6px;
}
.months-scroll-wrapper::-webkit-scrollbar-track {
  background: transparent;
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
  height: 224px;
}
.calendar-table__block {
  width: 316px;
  display: grid;
  align-content: space-around;
  justify-content: space-between;
  align-items: stretch;
  justify-items: stretch;
  column-gap: 6px;
  row-gap: 6px;
}

.calendar-table__block_week {
  display: flex;
  gap: 6px;
}

.calendar-day {
  width: 40px;
  height: 40px;
  padding: 10px 15px 10px 15px;
  border-radius: 60px;
  background: rgba(244, 245, 246, 1);
  font-size: 12px;
  font-weight: 400;
}

.calendar-day.other-month {
  color: #bdbdbd;
  background: #f7f7f7;
}

.calendar-day.selected {
  border: 2px solid #7334ea;
  background: #f1ebfd !important;
  color: #7334ea !important;
}
</style>
