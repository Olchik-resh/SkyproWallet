 <template>
  <main>
    <RouterView />
    <BaseHeader />

    <Transition name="slide-fade">
  
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