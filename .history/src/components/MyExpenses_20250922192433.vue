<template>
  <div class="expens__conteiner">
    <h1 class="text-ttl">Мои расходы</h1>
    <div class="tbl">
      <table class="tbl__expens"></table>
      <table class="tbl__new-expens"></table>
    </div>
  </div>
</template>

<script setup></script>

<style lang="css">
.expens__conteiner {
  margin-left: 120px;
  padding-top: 36px;
  margin-right: 120px;
  ma
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
}

.tbl__expens {
  width: 789px;
  height: 618px;
  border-radius: 30px;
  box-shadow: 0px 20px 67px -12px rgba(0, 0, 0, 0.13);
  background: var(--Skyeng b2b / White, rgba(255, 255, 255, 1));
}
.tbl__new-expens {
  width: 379px;
  height: 618px;
  border-radius: 30px;
  box-shadow: 0px 20px 67px -12px rgba(0, 0, 0, 0.13);
  background: var(--Skyeng b2b / White, rgba(255, 255, 255, 1));
}
</style>
