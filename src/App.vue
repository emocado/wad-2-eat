<template>
  <header>

    <div class="wrapper">
      <NavbarDefault light/>
    </div>
  </header>

  <RouterView />
</template>

<script>
import { RouterView } from 'vue-router'
import NavbarDefault from './components/NavbarDefault.vue'

export default {
  name: "App",
  components: {
    RouterView,
    NavbarDefault
  },
};
</script>

<style scoped>

</style>
