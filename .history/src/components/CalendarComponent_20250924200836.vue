<template>
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
    </thead>
    <div class="border"></div>
  </table>
</template>

<style lang="scss">
.cost-tbl__columns {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  margin-left: 43px;
}

.weekday{
  
}
</style>
