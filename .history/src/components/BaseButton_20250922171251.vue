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

<style lang="scss">
.
width: 313px;
height: 39px;
</style>
