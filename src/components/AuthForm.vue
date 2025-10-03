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
                :class="{
                  'input--error': showNameError,
                  'input--valid': isNameValid && (formTouched || touched.name),
                }"
                v-show="isSignUp"
                name="name"
                id="formname"
                placeholder="Имя"
                v-model="formData.name"
                @blur="onBlur('name')"
                @focus="clearError('name')"
                autocomplete="name"
                spellcheck="false"
                :error="showNameError"
              />

              <BaseInput
                :class="{
                  'input--error': showLoginError,
                  'input--valid': isLoginValid && (formTouched || touched.login),
                }"
                type="text"
                name="login"
                id="formlogin"
                placeholder="Эл.почта"
                v-model="formData.login"
                @blur="onBlur('login')"
                @focus="clearError('login')"
                autocomplete="email"
                spellcheck="false"
                :error="showLoginError"
              />

              <BaseInput
                :class="{
                  'input--error': showPasswordError,
                  'input--valid': isPasswordValid && (formTouched || touched.password),
                }"
                type="password"
                name="password"
                id="formpassword"
                placeholder="Пароль"
                v-model="formData.password"
                @blur="onBlur('password')"
                @focus="clearError('password')"
                autocomplete="current-password"
                spellcheck="false"
                :error="showPasswordError"
              />

              <p class="error-message" v-if="error">{{ error }}</p>

              <BaseButton type="submit" :disabled="isButtonDisabled" class="modal__btn">
                {{ isSignUp ? 'Зарегистрироваться' : 'Войти' }}
              </BaseButton>

              <div v-show="!isSignUp" class="modal__form-group">
                <p>Нужно зарегистрироваться?</p>
                <RouterLink to="/sign-up" class="btn__here">Регистрируйтесь здесь</RouterLink>
              </div>
              <div v-show="isSignUp" class="modal__form-group">
                <p>
                  Уже есть аккаунт?
                  <RouterLink to="/sign-in" class="btn__here"><br />Войдите здесь</RouterLink>
                </p>
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
import { signIn, signUp } from '@/services/auth'

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

const submitAttempted = ref(false)

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
  const isNameValid = props.isSignUp ? validateName(formData.value.name) : true
  const isLoginValid = validateLogin(formData.value.login)
  const isPasswordValid = validatePassword(formData.value.password)
  return !isNameValid || !isLoginValid || !isPasswordValid || loading.value
})

const isNameValid = computed(() => props.isSignUp && validateName(formData.value.name))

const isLoginValid = computed(() => validateLogin(formData.value.login))

const isPasswordValid = computed(() => validatePassword(formData.value.password))

const isButtonDisabled = computed(() => {
  if (loading.value) return true
  // Если была попытка отправки и данные невалидны — дизэйблим
  if (submitAttempted.value && isFormInvalid.value) return true
  // В остальных случаях — не дизэйблим
  return false
})

async function handleSubmit(event) {
  console.log('submit!')
  event.preventDefault()
  submitAttempted.value = true
  formTouched.value = true
  error.value = ''

  const isNameValid = props.isSignUp ? validateName(formData.value.name) : true
  const isLoginValid = validateLogin(formData.value.login)
  const isPasswordValid = validatePassword(formData.value.password)

  if (!isNameValid || !isLoginValid || !isPasswordValid) {
    error.value =
      'Упс! Введенные вами данные некорректны. Введите данные корректно и повторите попытку.'
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
      submitAttempted.value = false
      formTouched.value = false
    }
  } catch (err) {
    error.value = err.message
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

watch(formData, () => {
  submitAttempted.value = false
  formTouched.value = false
})
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

*:before,
*:after {
  box-sizing: border-box;
}

a,
a:visited {
  text-decoration: none;
  cursor: pointer;
}

button,
._btn {
  cursor: pointer;
}
.wrapper {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  background: rgba(244, 245, 246, 1);
}

.container-signin {
  display: block;
  width: 100vw;
  min-height: 100vh;
  margin: 0 auto;
}
._hover01:hover {
  background-color: #33399b;
}
.container-signin {
  display: block;
  width: 100vw;
  min-height: 100vh;
  margin: 0 auto;
}
.modal {
  width: 100%;
  height: 100%;
  min-width: 320px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin-top: 169px;
}
.modal__block {
  display: block;
  margin: 0 auto;
  background-color: #ffffff;
  max-width: 379px;
  width: 100%;
  padding: 32px 32px;
  border-radius: 30px;
  border: none;
  box-shadow: 0px 20px 67px -12px rgba(0, 0, 0, 0.13);
}
.modal__ttl h2 {
  text-align: center;
  font-size: 20px;
  font-weight: 700;
  line-height: 30px;
  letter-spacing: -0.6px;
  margin-bottom: 24px;
}
.modal__form-login {
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: stretch;
  align-items: stretch;
  gap: 12px;
}
.modal__input {
  width: 100%;
  min-width: 100%;
  border-radius: 8px;
  border: 0.7px solid rgba(148, 166, 190, 0.4);
  outline: none;
  padding: 10px 8px;
}
.modal__input::-moz-placeholder {
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  letter-spacing: -0.28px;
  color: #94a6be;
}
.modal__input::placeholder {
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  letter-spacing: -0.28px;
  color: #94a6be;
}
.modal__btn-enter {
  width: 100%;
  height: 30px;
  background-color: #565eef;
  border-radius: 4px;
  margin-top: 13px;
  margin-bottom: 20px;
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  line-height: 21px;
  font-weight: 500;
  letter-spacing: -0.14px;
  color: #ffffff;
}
.modal__btn:disabled {
  background: rgba(153, 153, 153, 1);
  cursor: not-allowed;
  border: none;
}

.modal__btn-enter a {
  width: 100%;
  height: 100%;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal__form-group {
  text-align: center;
}
.modal__form-group p,
.modal__form-group a {
  color: rgba(153, 153, 153, 1);
  font-family: Montserrat;
  font-size: 12px;
  font-weight: 400;
  line-height: 150%;
  letter-spacing: -0.14px;
  margin-top: 12px;
}

.input--valid {
  box-sizing: border-box;
  border: 0.5px solid rgba(115, 52, 234, 1);
  border-radius: 6px;
}
.input--valid input::placeholder {
  color: #000000;
}
.input--valid input {
  background-color: #f1ebfd;
}
.input--error {
  box-sizing: border-box;
  border: 0.5px solid rgba(242, 80, 80, 1);
  border-radius: 6px;
}
.input--error input {
  background-color: #ffebeb;
}
.input--error input::placeholder {
  color: #000000;
}
.input--error .star {
  color: #de2b2b;
  margin-left: 4px;
  font-weight: bold;
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
.error-message {
  color: #de2b2b;
  font-size: 12px;
  font-weight: 400;
  text-align: center;
}
.star {
  color: red;
  font-size: 1.2em;
  margin-left: 5px;
}
.btn__here {
  text-decoration: underline;
}
</style>
