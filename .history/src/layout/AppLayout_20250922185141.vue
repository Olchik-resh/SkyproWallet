<template>
  <BaseHeader :hideButtons="hideHeaderButtons" />
  <div class="wrapper">
    <RouterView />
  </div>
</template>

<script setup>
import BaseHeader from '@/components/BaseHeader.vue'
import { onMounted, provide, ref, computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'

const route = useRoute()
const hideHeaderButtons = computed(() => ['/exit', '/sign-up'].includes(route.path))

const userInfo = ref(null)

function setUserInfo(value) {
  userInfo.value = value
  try {
    localStorage.setItem('userInfo', JSON.stringify(value))
  } catch (e) {
    console.error('Ошибка при сохранении данных:', e)
    return null
  }
}

function removeUserInfo() {
  userInfo.value = null
  try {
    localStorage.removeItem('userInfo')
  } catch (e) {
    console.error('Ошибка при удалении данных:', e)
  }
}

provide('auth', {
  userInfo,
  setUserInfo,
  removeUserInfo,
})

onMounted(() => {
  try {
    const data = localStorage.getItem('userInfo')
    if (data) {
      userInfo.value = JSON.parse(data)
    }
  } catch (e) {
    userInfo.value = null
    console.error('Ошибка при загрузке данных:', e)
  }
})
</script>
