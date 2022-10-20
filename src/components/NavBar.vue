<template>
  <nav class="navbar navbar-expand-lg bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Navbar</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcancasNavbar"
        aria-controls="offcanvasNavbar" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="offcanvas offcanvas-start" id="offcancasNavbar" tabindex="-1">
        <ul class="navbar-nav px-3">
          <li class="nav-item">
            <!-- <a class="nav-link active" aria-current="page" href="#">Home</a> -->
            <RouterLink class="nav-link active" to="/">Home</RouterLink>
          </li>
          <li class="nav-item">
            <!-- <a class="nav-link" href="#">Features</a> -->
            <RouterLink class="nav-link active" to="/about">About</RouterLink>
          </li>
          <li class="nav-item">
            <!-- <a class="nav-link" href="#">Pricing</a> -->
            <RouterLink class="nav-link active" to="/swipe">Swipe</RouterLink>
          </li>
          <li class="nav-item">
            <!-- <a class="nav-link" href="#">Pricing</a> -->
            <RouterLink class="nav-link active" to="/forum">Forum</RouterLink>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Dropdown link
            </a>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#">Action</a></li>
              <li><a class="dropdown-item" href="#">Another action</a></li>
              <li><a class="dropdown-item" href="#">Something else here</a></li>
            </ul>
          </li>

          <div v-if="isLogin" class="login">
            <button class="btn btn-primary" @click="signOut">
              Sign Out
            </button>
          </div>

          <button v-else class="btn btn-primary" @click="signIn">
            Sign in
          </button>

        </ul>
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
  setup() {
    const { user, isLogin, signOut, signIn } = useAuth()
    return { user, isLogin, signOut, signIn }
  }
}
</script>
<style lang="">
    
</style>