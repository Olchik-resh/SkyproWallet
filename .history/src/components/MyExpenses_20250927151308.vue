<template>
  <div class="expens__conteiner">
    <h1 class="text-ttl">Мои расходы</h1>
    <div class="tbl">
      <div class="tbl__expens">
        <TblExpenses />
      </div>
      <div class="tbl__new-expens">
        <NewExpenses />
      </div>
    </div>
  </div>
</template>

<script setup>
import NewExpenses from './NewExpenses.vue'
import TblExpenses from './TblExpenses.vue'
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
  justify-content: flex-start;
  align-items: stretch;
}


</style>
