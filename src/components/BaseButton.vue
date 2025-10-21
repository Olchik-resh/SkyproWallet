<template>
  <button
    :type="type || 'button'"
    :disabled="disabled"
    :class="[
      'button',
      className,
      'modal__btn',
      {
        'button--disabled': disabled,
        'button--active': active,
      },
    ]"
  >
    <slot></slot>
  </button>
</template>

<script setup>
defineProps({
  type: String,
  disabled: Boolean,
  className: String,
  active: Boolean,
})
</script>

<style lang="scss">
button,
._btn {
  cursor: pointer;
}

.modal__btn {
  width: 313px;
  height: 39px;
  justify-content: center;
  align-items: center;
  padding: 12px;
  border-radius: 6px;
  background: rgba(115, 52, 234, 1);
  color: rgba(255, 255, 255, 1);
  font-family: Montserrat;
  font-size: 12px;
  font-weight: 600;
  border: none;
}

.modal__btn:hover {
  background: #5e1acc;
}

.button--active {
  background: #7334ea !important;
  color: #fff !important;
  cursor: pointer;
}

.button--disabled {
  background: #d0d0d0 !important;
  color: #999 !important;
  cursor: not-allowed;
}
</style>
