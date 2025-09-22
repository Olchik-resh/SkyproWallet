<template>
  <RouterView />
  <BaseHeader />
  <MyExpenses />
</template>

<script setup>
import BaseHeader from '@/components/BaseHeader.vue'

import MyExpenses from '@/components/MyExpenses.vue'
</script>
