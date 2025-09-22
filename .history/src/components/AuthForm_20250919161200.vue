<template>
  <div>
    <div class="wrapper">
      <div class="container-signin">
        <div class="modal">
          <div class="modal__block">
            <div class="modal__ttl">
              <h2>{{ isSignUp ? 'Регистрация' : 'Вход' }}</h2>
            </div>
            <form class="modal__form-login" @submit.prevent="handleSubmit">
              <BaseInput
                :class="{ error: showNameError }"
                v-show="isSignUp"
                name="name"
                id="formname"
                placeholder="Имя"
                v-model="formData.name"
                @blur="onBlur('name')"
                @focus="clearError('name')"
                autocomplete="name"
                spellcheck="false"
              />

              <BaseInput
                :class="{ error: showLoginError }"
                type="text"
                name="login"
                id="formlogin"
                placeholder="Эл.почта"
                v-model="formData.login"
                @blur="onBlur('login')"
                @focus="clearError('login')"
                autocomplete="email"
                spellcheck="false"
              />

              <BaseInput
                :class="{ error: showPasswordError }"
                type="password"
                name="password"
                id="formpassword"
                placeholder="Пароль"
                v-model="formData.password"
                @blur="onBlur('password')"
                @focus="clearError('password')"
                autocomplete="current-password"
                spellcheck="false"
              />

              <p class="error-message" v-if="error">{{ error }}</p>

              <BaseButton
                type="secondary"
                :fullWidth="true"
                class="modal__btn-enter"
                :disabled="isFormInvalid"
              >
                {{ isSignUp ? 'Зарегистрироваться' : 'Войти' }}
              </BaseButton>

              <div v-show="!isSignUp" class="modal__form-group">
                <p>Нужно зарегистрироваться?</p>
                <RouterLink to="/sign-up">Регистрируйтесь здесь</RouterLink>
              </div>
              <div v-show="isSignUp" class="modal__form-group">
                <p>Уже есть аккаунт? <RouterLink to="/sign-in">Войдите здесь</RouterLink></p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, inject, watch, computed } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import BaseInput from './BaseInput.vue'
import BaseButton from './BaseButton.vue'
import { signIn, signUp } from '@/servises/auth'
const auth = inject('auth')
const userInfo = auth?.user
const router = useRouter()

const props = defineProps({
  isSignUp: Boolean,
})

const formData = ref({
  name: '',
  login: '',
  password: '',
})

const loading = ref(false)

const touched = ref({
  name: false,
  login: false,
  password: false,
})

const formTouched = ref(false)

const error = ref('')

function validateName(name) {
  return !!name.trim()
}
function validateLogin(login) {
  return !!login.trim()
}
function validatePassword(password) {
  return !!password.trim()
}

function onBlur(field) {
  touched.value[field] = true
}

function clearError(fieldName) {
  touched.value[fieldName] = false
}

const showNameError = computed(
  () =>
    props.isSignUp &&
    (formTouched.value || touched.value.name) &&
    !validateName(formData.value.name),
)
const showLoginError = computed(
  () => (formTouched.value || touched.value.login) && !validateLogin(formData.value.login),
)
const showPasswordError = computed(
  () => (formTouched.value || touched.value.password) && !validatePassword(formData.value.password),
)

const isFormInvalid = computed(() => {
  if (!formTouched.value) return false

  const isNameValid = props.isSignUp ? validateName(formData.value.name) : true
  const isLoginValid = validateLogin(formData.value.login)
  const isPasswordValid = validatePassword(formData.value.password)
  return !isNameValid || !isLoginValid || !isPasswordValid || loading.value
})

const SIGN_UP_ERROR_MESSAGE =
  'Введённые вами данные некорректны. Чтобы завершить регистрацию, заполните все поля в форме.'
const LOGIN_ERROR_MESSAGE =
  'Введённые вами данные не распознаны. Проверьте свой логин и пароль и повторите попытку входа.'

async function handleSubmit(event) {
  event.preventDefault()
  formTouched.value = true
  error.value = ''

  const isNameValid = props.isSignUp ? validateName(formData.value.name) : true
  const isLoginValid = validateLogin(formData.value.login)
  const isPasswordValid = validatePassword(formData.value.password)

  if (!isNameValid || !isLoginValid || !isPasswordValid) {
    error.value = props.isSignUp ? SIGN_UP_ERROR_MESSAGE : LOGIN_ERROR_MESSAGE
    return
  }

  loading.value = true
  try {
    const data = props.isSignUp
      ? await signUp(formData.value)
      : await signIn({ login: formData.value.login, password: formData.value.password })

    if (data) {
      auth.setUserInfo(data)
      router.push('/')
    }
  } catch (err) {
    error.value = err.message
    console.error('Ошибка авторизации:', err)
  } finally {
    loading.value = false
  }
}

if (userInfo) {
  watch(
    userInfo,
    (newVal) => {
      console.log('Пользователь изменился:', newVal)
    },
    { immediate: true },
  )
}
</script>
