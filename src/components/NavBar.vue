<template>
  <nav id="navbar" class="navbar navbar-expand-lg bg-light">
    <div class="container-fluid">
      <RouterLink class="navbar-brand" to="/">WAD-2-EAT</RouterLink>
      <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcancasNavbar"
        aria-controls="offcanvasNavbar" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div v-if="isMobile" class="offcanvas offcanvas-start" id="offcancasNavbar" tabindex="-1">
        <div class="d-flex justify-content-between align-items-center">
          <ul class="navbar-nav px-3 ">
            
            <li class="nav-item p-2" data-bs-toggle="offcanvas" data-bs-target="#offcancasNavbar">
              <!-- <a class="nav-link active" aria-current="page" href="#">Home</a> -->
              <RouterLink class="nav-link active" to="/">Home</RouterLink>
            </li>
            <li class="nav-item p-2" data-bs-toggle="offcanvas" data-bs-target="#offcancasNavbar">
              <!-- <a class="nav-link" href="#">Pricing</a> -->
              <RouterLink class="nav-link active" to="/swipe">Swipe</RouterLink>
            </li>
            <li class="nav-item p-2" data-bs-toggle="offcanvas" data-bs-target="#offcancasNavbar">
              <!-- <a class="nav-link" href="#">foodreciperoulette</a> -->
              <RouterLink class="nav-link active" to="/foodreciperoulette">Food Recipe Roulette</RouterLink>
            </li>
            <li class="nav-item p-2" data-bs-toggle="offcanvas" data-bs-target="#offcancasNavbar">
              <!-- <a class="nav-link" href="#">mealroulette</a> -->
              <RouterLink class="nav-link active" to="/roulettemain">Meal Roulette!</RouterLink>
            </li>
            <li class="nav-item p-2" data-bs-toggle="offcanvas" data-bs-target="#offcancasNavbar">
              <!-- <a class="nav-link" href="#">Pricing</a> -->
              <RouterLink class="nav-link active" to="/forum">Forum</RouterLink>
            </li>
            <li class="nav-item p-2" data-bs-toggle="offcanvas" data-bs-target="#offcancasNavbar">
              <RouterLink class="nav-link active" to="/group">Room</RouterLink>
            </li>
          </ul>
          
          <span class="p-2">
            <button v-if="isLogin" class="btn btn-primary" @click="signOut">
              Sign Out
            </button>
            
            <button v-else class="btn btn-primary" @click="signIn">
              Sign in
            </button>
          </span>
        </div>
      </div>

      <div v-else class="offcanvas offcanvas-start" id="offcancasNavbar" tabindex="-1">
        <div class="d-flex justify-content-between align-items-center">
          <ul class="navbar-nav px-3 ">
            
            <li class="nav-item p-2">
              <!-- <a class="nav-link active" aria-current="page" href="#">Home</a> -->
              <RouterLink class="nav-link active" to="/">Home</RouterLink>
            </li>
            <li class="nav-item p-2">
              <!-- <a class="nav-link" href="#">Pricing</a> -->
              <RouterLink class="nav-link active" to="/swipe">Swipe</RouterLink>
            </li>
            <li class="nav-item p-2">
              <!-- <a class="nav-link" href="#">foodreciperoulette</a> -->
              <RouterLink class="nav-link active" to="/foodreciperoulette">Food Recipe Roulette</RouterLink>
            </li>
            <li class="nav-item p-2">
              <!-- <a class="nav-link" href="#">mealroulette</a> -->
              <RouterLink class="nav-link active" to="/roulettemain">Meal Roulette!</RouterLink>
            </li>
            <li class="nav-item p-2">
              <!-- <a class="nav-link" href="#">Pricing</a> -->
              <RouterLink class="nav-link active" to="/forum">Forum</RouterLink>
            </li>
            <li class="nav-item p-2">
              <RouterLink class="nav-link active" to="/group">Room</RouterLink>
            </li>
          </ul>

          <span class="p-2">
            <button v-if="isLogin" class="btn btn-primary" @click="signOut">
              Sign Out
            </button>
            
            <button v-else class="btn btn-primary" @click="signIn">
              Sign in
            </button>
          </span>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { RouterLink } from 'vue-router'
import { useAuth } from '@/firebase'

export default {
  components: {
    RouterLink,
  },
  data() {
    return {
      isMobile: false,
    }
  },
  mounted() {
    window.addEventListener("resize", this.myEventHandler);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.myEventHandler);
  },
  methods: {
    myEventHandler() {
      this.isMobile = window.innerWidth < 992
    },
  },
  setup() {
    const { user, isLogin, signOut, signIn } = useAuth()
    return { user, isLogin, signOut, signIn }
  }
}
</script>
<style scoped>
  @media (max-width: 992px) {
    #offcancasNavbar {
      width: 200px;
    }
    #offcancasNavbar > div {
      flex-direction: column;
      align-items: start !important;
      padding: 10px;
    }
  }

  #navbar {
    z-index: 15;
  }
</style>