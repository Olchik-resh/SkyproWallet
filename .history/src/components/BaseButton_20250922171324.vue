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
.modal__btn {
  width: 313px;
  height: 39px;
  justify-content: center;
  align-items: center;
  gap: 12;
  padding: 12px;
}
</style>
