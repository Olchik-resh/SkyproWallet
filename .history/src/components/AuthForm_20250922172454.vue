<template>
  <div>
    <div class="wrapper">
      <BaseHeader />
      <div class="container-signin">
        <div class="modal">
          <div class="modal__block">
            <div class="modal__ttl">
              <h2>{{ isSignUp ? 'Регистрация' : 'Вход' }}</h2>
            </div>
            <form class="modal__form-login" @submit.prevent="handleSubmit">
              <!-- Поле имени только для регистрации -->
              <BaseInput v-if="isSignUp" name="name" placeholder="Имя" v-model="formData.name" />
              <!-- Email -->
              <BaseInput
                name="login"
                placeholder="Эл.почта"
                type="email"
                v-model="formData.login"
              />
              <!-- Пароль -->
              <BaseInput
                name="password"
                placeholder="Пароль"
                type="password"
                v-model="formData.password"
              />

              <BaseButton :fullWidth="true">
                {{ isSignUp ? 'Зарегистрироваться' : 'Войти' }}
              </BaseButton>

              <!-- Ссылки для переключения между формами -->
              <div class="modal__form-group">
                <template v-if="!isSignUp">
                  <p>Нужно зарегистрироваться?<br /></p>
                  <a href="#" @click.prevent="toggleForm" class="reg__btn">Регистрируйтесь здесь</a>
                </template>
                <template v-else>
                  <p>Уже есть аккаунт? <a href="#" @click.prevent="toggleForm">Войдите здесь</a></p>
                </template>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import BaseInput from './BaseInput.vue'
import BaseButton from './BaseButton.vue'
import BaseHeader from './BaseHeader.vue'

const isSignUp = ref(false)
const formData = ref({
  name: '',
  login: '',
  password: '',
})

function toggleForm() {
  isSignUp.value = !isSignUp.value
  // При переключении можете очищать форму если нужно
  // formData.value = { name: '', login: '', password: '' }
}

function handleSubmit() {
  // Тут логика входа или регистрации
  if (isSignUp.value) {
    // Регистрация
    // signUp(formData.value)
  } else {
    // Вход
    // signIn({ login: formData.value.login, password: formData.value.password })
  }
}
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
  margin-bottom: 20px;
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
.modal__btn-enter:disabled {
  background-color: #94a6be;
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
.reg__btn {
  u
}
</style>
