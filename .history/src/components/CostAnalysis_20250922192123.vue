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
.cost-tbl__period{

}
</style>
