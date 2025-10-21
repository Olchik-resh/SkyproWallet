<template>
  <div class="base-input-wrapper" style="position: relative">
    <input
      ref="inputRef"
      :class="[
        'input',
        {
          'input--error': error,
          'input--active': isActive,
          'input--valid': isValid,
        },
      ]"
      :type="type"
      :name="name"
      :id="id"
      :placeholder="placeholder"
      v-model="model"
      @input="handleInput"
      @focus="onFocus"
      @blur="onBlur"
    />
    <span v-if="error && touched" class="input-star" :style="{ left: starPosition + 'px' }">*</span>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, nextTick, computed } from 'vue'

const props = defineProps({
  id: { type: String, required: true },
  name: { type: String, required: true },
  placeholder: { type: String, default: '' },
  type: { type: String, default: 'text' },
  error: { type: Boolean, default: false },
  touched: { type: Boolean, default: false },
})

const model = defineModel()
const inputRef = ref(null)
const starPosition = ref(24)
const emit = defineEmits(['input', 'blur', 'focus'])
const isActive = ref(false)
const isValid = computed(() => model.value && !props.error && props.touched)


function getStarPosition() {
  const input = inputRef.value
  if (!input) return 24
  const value = model.value || ''
  const style = window.getComputedStyle(input)
  const font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`
  const canvas =
    getStarPosition._canvas || (getStarPosition._canvas = document.createElement('canvas'))
  const ctx = canvas.getContext('2d')
  ctx.font = font
  const textToMeasure = value || props.placeholder
  const textWidth = ctx.measureText(textToMeasure).width
  const paddingLeft = parseFloat(style.paddingLeft) || 16
  return paddingLeft + textWidth + 6
}
function updateStarPosition() {
  nextTick(() => {
    starPosition.value = getStarPosition()
  })
}

function onFocus(e) {
  isActive.value = true
  emit('focus', e)
}
function onBlur(e) {
  isActive.value = false
  updateStarPosition()
  emit('blur', e)
}

function handleInput(e) {
  updateStarPosition()
  // пробросить наверх
  emit('input', e)
}

watch(model, updateStarPosition)
onMounted(updateStarPosition)
</script>

<style lang="scss">
.input {
  width: 313px;
  height: 39px;
  border-radius: 6px;
  border: 0.5px solid #999;
  outline: none;
  padding: 12px 12px;
  padding-right: 1.5em;
  background: #fff;
  color: #000;
}

.input--active {
  background: #f1ebfd;
  border-color: #7334ea;
  color: #000;
}

.input--valid {
  background: #f1ebfd;
  border-color: #7334ea;
  color: #000;
}

.input--error {
  border: 0.5px solid #f25050;
  background-color: #ffebeb;
}
.input--error::placeholder {
  color: #000;
}
.input--active::placeholder,
.input--valid::placeholder {
  color: #000;
}

.input-star {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  color: #d82b2b;
  font-size: 1.2em;
  pointer-events: none;
  user-select: none;
  transition: left 0.1s;
  z-index: 2;
}
</style>
