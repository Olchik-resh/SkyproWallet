<template>
  <div class="input-field">
    <input
      class="input"
      :type="type"
      :name="name"
      :id="id"
      :placeholder="placeholder"
      v-model="model"
      :class="{
        'input--error': error,
        'input--valid': valid,
      }"
    />
    <span v-if="error" class="input-star">*</span>
  </div>
</template>

<script setup>
defineProps({
  id: { type: String, required: true },
  name: { type: String, required: true },
  placeholder: { type: String, default: '' },
  type: { type: String, default: 'text' },
  error: { type: Boolean, default: false },
  valid: { type: Boolean, default: false },
})
const model = defineModel()
</script>

<style lang="scss">
.input-field {
  position: relative;
  width: 100%;
}
.input {
  width: 100%;
  min-width: 100%;
  border-radius: 6px;
  border: 0.5px solid rgba(153, 153, 153, 1);
  outline: none;
  padding: 12px 12px;
  padding-right: 1.5em;
}
.input-star {
  position: absolute;
  right: 0.75em;
  top: 50%;
  transform: translateY(-50%);
  color: #d82b2b;
  font-size: 1.2em;
  pointer-events: none;
  user-select: none;
}
</style>
