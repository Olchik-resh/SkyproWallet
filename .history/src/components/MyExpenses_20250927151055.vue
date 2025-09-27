<template>
  <div class="expens__conteiner">
    <h1 class="text-ttl">Мои расходы</h1>
    <div class="tbl">
      <div class="tbl__expens"><TblExpenses /></div>
      <div class="tbl__new-expens">
        <NewExpenses />
      </div>
    </div>
  </div>
</template>

<script setup>
import NewExpenses from './NewExpenses.vue'
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
  margin-top: 32px;
  display: flex;
  gap: 34px;
  flex-direction: row;
  flex-wrap: nowrap;
  /* align-content: stretch; */
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
  height: 100%;
  border-radius: 30px;
  box-shadow: 0px 20px 67px -12px rgba(0, 0, 0, 0.13);
  background: rgba(255, 255, 255, 1);
}

.tbl__ttl {
  padding: 32px;
  font-size: 24px;
  font-weight: 700;
}

.expenses-table__columns {
  font-size: 12px;
  color: #999999;
  width: 582px;
}

.description {
  width: 141px;
  padding-right: 32px;
}
.category {
  width: 141px;
  padding-right: 32px;
}
.date {
  width: 142px;
  padding-right: 32px;
}
.amount {
  width: 134px;
  padding-right: 32px;
}
.border {
  width: 789px;
  padding-left: 0px;
  padding-top: 5.75px;
  border-bottom: 0.5px solid rgba(153, 153, 153, 1);
}

.expenses-table-scroll {
  padding-left: 32px;
  height: 504px;
  width: 789px;
  overflow-y: auto;
  scrollbar-gutter: stable;
}

.expenses-table-scroll::-webkit-scrollbar {
  width: 6px;
}
.expenses-table-scroll::-webkit-scrollbar-thumb {
  border-radius: 30px;
  height: 100px;
  background: #bbb;
}
.expenses-table-scroll::-webkit-scrollbar-track {
  background: transparent;
  border-radius: 30px;
}
.expens-columns {
  color: #000000;
  font-size: 12px;
}
</style>
