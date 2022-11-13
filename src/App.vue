<template>
  <header class="sticky-top">

    <div class="wrapper">
      <NavBar/>
    </div>
  </header>

  <RouterView />
</template>

<script>
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'

export default {
  name: "App",
  components: {
    RouterView,
    NavBar
  },
};
</script>

<style scoped>

</style>
