<template>
  <main>
    <RouterView />
    <BaseHeader />

    <Transition name="slide-fade"> </Transition>

    <div class="wrapper" ">
      <Transition name="fade"> </Transition>
    </div>
  </main>
</template>
