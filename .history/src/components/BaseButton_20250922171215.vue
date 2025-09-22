<template>
  <button :class="['button', type ?? 'primary']" class="modal__btn" id="btnEnter">
    <slot></slot>
  </button>
</template>

<script setup>
defineProps({
  type: String,
})
</script>

<style>
</style>
