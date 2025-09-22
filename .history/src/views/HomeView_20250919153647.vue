 <template>
  <main>
    <RouterView />
    <BaseHeader />

    <Transition name="slide-fade">
      <div v-if="isOffline" class="network-error">
        Нет подключения к интернету. Проверьте сеть и попробуйте снова!
        <button @click="retryFetch" class="network-btn">Повторить попытку</button>
      </div>
    </Transition>

    <div class="wrapper" :loading="loading">
      <Transition name="fade">
        <TaskDesk
          :loading="loading"
          :tasks="tasks"
          :error="error"
          @retry="getTasks"
          :lastTasksCount="lastTasksCount"
        />
      </Transition>
    </div>
  </main>
</template>