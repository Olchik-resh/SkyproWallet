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