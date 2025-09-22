<template>
  <BaseHeader />
  <div class="wrapper">
    <!-- <RouterView /> -->
  </div>
</template>

<script setup>
import BaseHeader from '@/components/BaseHeader.vue'
import { onMounted, provide, ref } from 'vue'
import { RouterView } from 'vue-router'

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
  userInfo: userInfo,
  setUser: setUserInfo,
  removeUser: removeUserInfo,
  setUserInfo: setUserInfo,
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
