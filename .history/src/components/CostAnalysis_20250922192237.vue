<template>
  <div class="cost__conteiner">
    <h1 class="text-ttl">Анализ расходов</h1>
    <div class="cost-tbl">
      <table class="cost-tbl__period"></table>
      <table class="cost-tbl__chart"></table>
    </div>
  </div>
</template>

<script setup></script>

<style lang="css">
.cost__conteiner {
  margin-left: 120px;
  padding-top: 36px;
  margin-right: 120px;
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
}
.cost-tbl__period {
  width: 379px;
  height: 540px;
  border-radius: 30px;
  box-shadow: 0px 20px 67px -12px rgba(0, 0, 0, 0.13);
  background: var(--Skyeng b2b / White, rgba(255, 255, 255, 1));
}
.cost-tbl__chart
</style>
