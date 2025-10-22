<template>
  <div class="wrapper">
    <div class="container-signin">
      <div class="modal">
        <div class="modal__block">
          <div class="modal__ttl">
            <h2>{{ isSignUp ? 'Регистрация' : 'Вход' }}</h2>
          </div>
          <form class="modal__form-login" @submit.prevent="handleSubmit">

            <BaseInput
              v-if="isSignUp"
              name="name"
              id="formname"
              placeholder="Имя"
              v-model="formData.name"
              :error="errors.name && (touched.name || submitAttempted)"
              :touched="touched.name || submitAttempted"
              :showStar="true"
              @focus="clearError('name')"
              @input="onInput('name', formData.name, validateName)"
              autocomplete="name"
              spellcheck="false"
            />


            <BaseInput
              type="text"
              name="login"
              id="formlogin"
              placeholder="Эл.почта"
              v-model="formData.login"
              :error="errors.login && (touched.login || submitAttempted)"
              :touched="touched.login || submitAttempted"
              :showStar="true"
              @focus="clearError('login')"
              @input="onInput('login', formData.login, validateLogin)"
              autocomplete="email"
            />


            <BaseInput
              type="password"
              name="password"
              id="formpassword"
              placeholder="Пароль"
              v-model="formData.password"
              :error="errors.password && (touched.password || submitAttempted)"
              :touched="touched.password || submitAttempted"
              :showStar="true"
              @focus="clearError('password')"
              @input="onInput('password', formData.password, validatePassword)"
              autocomplete="current-password"
            />


            <p class="error-message" v-if="error">{{ error }}</p>


            <BaseButton
              type="secondary"
              :fullWidth="true"
              class="modal__btn-enter"
              :class="{ error: isButtonDisabled }"
              :disabled="isButtonDisabled"
            >
              {{ isSignUp ? 'Зарегистрироваться' : 'Войти' }}
            </BaseButton>


            <div v-if="!isSignUp" class="modal__form-group">
              <p>Нужно зарегистрироваться?</p>
              <RouterLink to="/sign-up" class="btn__here">Регистрируйтесь здесь</RouterLink>
            </div>
            <div v-else class="modal__form-group">
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
</template>

<script setup>
import { reactive, ref, computed, watch } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import BaseInput from './BaseInput.vue'
import BaseButton from './BaseButton.vue'
import auth from '@/services/auth.js'
import { inject } from 'vue'

const router = useRouter()
const props = defineProps({ isSignUp: Boolean })
const { setUserInfo } = inject('auth')

const formData = reactive({ name: '', login: '', password: '' })
const touched = reactive({ name: false, login: false, password: false })
const errors = reactive({ name: false, login: false, password: false })

const error = ref('')
const loading = ref(false)
const submitAttempted = ref(false)

const ERROR_MESSAGE =
  'Упс! Введенные вами данные некорректны. Введите данные корректно и повторите попытку.'

function validateName(name) {
  return !!name.trim()
}
function validateLogin(login) {
  return !!login.trim()
}
function validatePassword(password) {
  return !!password.trim()
}

const isFormInvalid = computed(() => {
  const invalid =
    (props.isSignUp && !validateName(formData.name)) ||
    !validateLogin(formData.login) ||
    !validatePassword(formData.password)
  return (
    loading.value || (invalid && (submitAttempted.value || Object.values(touched).some(Boolean)))
  )
})

const isButtonDisabled = computed(() => isFormInvalid.value || !!error.value)

function onInput(field, value) {
  touched[field] = true
  if (field === 'name') errors.name = props.isSignUp && !validateName(value)
  if (field === 'login') errors.login = !validateLogin(value)
  if (field === 'password') errors.password = !validatePassword(value)
}

function clearError(fieldName) {
  errors[fieldName] = false
  touched[fieldName] = false
}

async function handleSubmit(e) {
  e.preventDefault()
  submitAttempted.value = true

  errors.name = props.isSignUp && !validateName(formData.name)
  errors.login = !validateLogin(formData.login)
  errors.password = !validatePassword(formData.password)
  touched.name = true
  touched.login = true
  touched.password = true

  if (errors.name || errors.login || errors.password) {
    error.value = ERROR_MESSAGE
    return
  }

  loading.value = true
  error.value = ''

  try {
    let userData
    if (props.isSignUp) {
      userData = await auth.signUp({
        name: formData.name,
        login: formData.login,
        password: formData.password,
      })
    } else {
      userData = await auth.signIn({
        login: formData.login,
        password: formData.password,
      })
    }
    if (userData && userData.user && userData.user.token) {
      setUserInfo(userData.user)
      router.push('/')
    } else {
      error.value = 'Не удалось выполнить запрос. Попробуйте позже.'
    }
  } catch (err) {
    error.value = err.message || ERROR_MESSAGE
    if (
      err.message.toLowerCase().includes('логин') ||
      err.message.toLowerCase().includes('login')
    ) {
      errors.login = true
      touched.login = true
    }
    if (
      err.message.toLowerCase().includes('пароль') ||
      err.message.toLowerCase().includes('password')
    ) {
      errors.password = true
      touched.password = true
    }
    if (err.message.toLowerCase().includes('имя') || err.message.toLowerCase().includes('name')) {
      errors.name = true
      touched.name = true
    }
  } finally {
    loading.value = false
  }
}

watch(
  () => props.isSignUp,
  () => {
    Object.assign(formData, { name: '', login: '', password: '' })
    Object.assign(touched, { name: false, login: false, password: false })
    Object.assign(errors, { name: false, login: false, password: false })
    error.value = ''
    submitAttempted.value = false
  },
)
watch(formData, () => (error.value = ''), { deep: true })
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

.wrapper {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  background: rgba(244, 245, 246, 1);
}
.input-field {
  position: relative;
  width: 100%;
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
.input-placeholder-black::placeholder {
  color: #222 !important; /* Чёрный */
  opacity: 1;
  transition: color 0.2s;
}
.modal__btn-enter {
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
  margin-top: 12px;
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

.error-message {
  color: #de2b2b;
  font-size: 12px;
  font-weight: 400;
  text-align: center;
}

.btn__here {
  text-decoration: underline;
}
</style>
