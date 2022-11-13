<template>
  <nav id="navbar" class="navbar navbar-expand-lg">
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
              <RouterLink class="nav-link active" to="/">Home</RouterLink>
            </li>
            <li class="nav-item p-2" data-bs-toggle="offcanvas" data-bs-target="#offcancasNavbar">
              <RouterLink class="nav-link active" to="/swipe">Swipe</RouterLink>
            </li>
            <li class="nav-item p-2" data-bs-toggle="offcanvas" data-bs-target="#offcancasNavbar">
              <RouterLink class="nav-link active" to="/foodreciperoulette">Food Recipe Roulette</RouterLink>
            </li>
            <li class="nav-item p-2" data-bs-toggle="offcanvas" data-bs-target="#offcancasNavbar">
              <RouterLink class="nav-link active" to="/mealroulettemain">Meal Roulette!</RouterLink>
            </li>
            <li class="nav-item p-2" data-bs-toggle="offcanvas" data-bs-target="#offcancasNavbar">
              <RouterLink class="nav-link active" to="/restaurantroulettemain">Restaurant Roulette!</RouterLink>
            </li>
            <li class="nav-item p-2" data-bs-toggle="offcanvas" data-bs-target="#offcancasNavbar">
              <RouterLink class="nav-link active" to="/recipe">Recipe Search</RouterLink>
            </li>
            <li class="nav-item p-2" data-bs-toggle="offcanvas" data-bs-target="#offcancasNavbar">
              <RouterLink class="nav-link active" to="/ingredient_filter">Ingredient Filter</RouterLink>
            </li>
            <li class="nav-item p-2" data-bs-toggle="offcanvas" data-bs-target="#offcancasNavbar">
              <RouterLink class="nav-link active" to="/forum">Forum</RouterLink>
            </li>
            <li class="nav-item p-2" data-bs-toggle="offcanvas" data-bs-target="#offcancasNavbar">
              <RouterLink class="nav-link active" to="/group">Room</RouterLink>
            </li>
          </ul>
          
          <span class="p-2">
            <button v-if="isLogin" class="btn" @click="signOut">
              Sign Out
            </button>
            
            <button v-else class="btn" @click="signIn">
              Sign in
            </button>
          </span>
        </div>
      </div>

      <div v-else class="offcanvas offcanvas-start" id="offcancasNavbar" tabindex="-1">
        <div class="d-flex justify-content-between align-items-center">
          <ul class="navbar-nav px-3 ">
            
            <li class="nav-item p-2">
              <RouterLink class="nav-link active" to="/">Home</RouterLink>
            </li>
            <li class="nav-item dropdown p-2">
              <a class="nav-link active dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Eat Out
              </a>
              <ul class="dropdown-menu">
                <li>
                  <RouterLink class="nav-link active" to="/swipe">Swipe</RouterLink>
                </li>
                <li>
                  <RouterLink class="nav-link active" to="/restaurantroulettemain">Restaurant Roulette!</RouterLink>
                </li>
                <li>
                  <RouterLink class="nav-link active" to="/group">Room</RouterLink>
                </li>
              </ul>
            </li>
            <li class="nav-item dropdown p-2">
              <a class="nav-link active dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Eat at home
              </a>
              <ul class="dropdown-menu">
                <li>
                  <RouterLink class="nav-link active" to="/foodreciperoulette">Food Recipe Roulette</RouterLink>
                </li>
                <li>
                  <RouterLink class="nav-link active" to="/mealroulettemain">Meal Roulette!</RouterLink>
                </li>
                <li>
                  <RouterLink class="nav-link active" to="/recipe">Recipe Search</RouterLink>
                </li>
                <li>
                  <RouterLink class="nav-link active" to="/ingredient_filter">Ingredient Filter</RouterLink>
                </li>
              </ul>
            </li>
            <li class="nav-item p-2">
              <RouterLink class="nav-link active" to="/forum">Forum</RouterLink>
            </li>
          </ul>

          <span class="p-2">
            <button v-if="isLogin" class="btn" @click="signOut">
              Sign Out
            </button>
            
            <button v-else class="btn" @click="signIn">
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
      background: linear-gradient(135deg, #C8F3FF , white);
    }
    #offcancasNavbar > div {
      flex-direction: column;
      align-items: start !important;
      padding: 10px;
      background: linear-gradient(135deg, #C8F3FF , white);
    }
  }

  #navbar {
    z-index: 15;
    background: linear-gradient(135deg, #C8F3FF , white);
  }

  .dropdown-menu {
    min-width: 200px;
  }
  .btn{
      background: #5E5DF0;
      border-radius: 999px;
      box-shadow: #5E5DF0 0 10px 20px -10px;
      box-sizing: border-box;
      color: #FFFFFF;
      cursor: pointer;
      font-family: Inter,Helvetica,"Apple Color Emoji","Segoe UI Emoji",NotoColorEmoji,"Noto Color Emoji","Segoe UI Symbol","Android Emoji",EmojiSymbols,-apple-system,system-ui,"Segoe UI",Roboto,"Helvetica Neue","Noto Sans",sans-serif;
      font-size: 16px;
      font-weight: 700;
      line-height: 24px;
      opacity: 1;
      outline: 0 solid transparent;
      padding: 8px 18px;
      user-select: none;
      -webkit-user-select: none;
      touch-action: manipulation;
      width: fit-content;
      word-break: break-word;
      border: 0;

  }
  .btn:hover{
      background: #faa6e5;
      border-radius: 999px;
      box-shadow: #5E5DF0 0 10px 20px -10px;
      box-sizing: border-box;
      color: #FFFFFF;
      cursor: pointer;
      font-family: Inter,Helvetica,"Apple Color Emoji","Segoe UI Emoji",NotoColorEmoji,"Noto Color Emoji","Segoe UI Symbol","Android Emoji",EmojiSymbols,-apple-system,system-ui,"Segoe UI",Roboto,"Helvetica Neue","Noto Sans",sans-serif;
      font-size: 16px;
      font-weight: 700;
      line-height: 24px;
      opacity: 1;
      outline: 0 solid transparent;
      padding: 8px 18px;
      user-select: none;
      -webkit-user-select: none;
      touch-action: manipulation;
      width: fit-content;
      word-break: break-word;
      border: 0;
  }

    .btn{
    --bs-btn-font-weight: 600;
    --bs-btn-color: var(--bs-white);
    --bs-btn-bg: var(--bd-violet);
    --bs-btn-border-color: var(--bd-violet);
    --bs-btn-border-radius: .5rem;
    --bs-btn-hover-color: var(--bs-white);
    /* --bs-btn-hover-bg: #{shade-color($bd-violet, 10%)};
    --bs-btn-hover-border-color: #{shade-color($bd-violet, 10%)}; */
    --bs-btn-focus-shadow-rgb: var(--bd-violet-rgb);
    --bs-btn-active-color:#FFFFFF ;
    --bs-btn-active-bg: #5E5DF0;
    /* --bs-btn-active-border-color: #{shade-color($bd-violet, 20%)}; */
    }
  /* .btn:active{
      background-color: #5E5DF0;
      border-radius: 999px;
      box-shadow: #5E5DF0 0 10px 20px -10px;
      box-sizing: border-box;
      color: #5E5DF0;;
      cursor: pointer;
      font-family: Inter,Helvetica,"Apple Color Emoji","Segoe UI Emoji",NotoColorEmoji,"Noto Color Emoji","Segoe UI Symbol","Android Emoji",EmojiSymbols,-apple-system,system-ui,"Segoe UI",Roboto,"Helvetica Neue","Noto Sans",sans-serif;
      font-size: 16px;
      font-weight: 700;
      line-height: 24px;
      opacity: 1;
      outline: 0 solid transparent;
      padding: 8px 18px;
      user-select: none;
      -webkit-user-select: none;
      touch-action: manipulation;
      width: fit-content;
      word-break: break-word;
      border: 0;
  } */
  /* .btn::selection{
      background-color: #5E5DF0;
      border-radius: 999px;
      box-shadow: #5E5DF0 0 10px 20px -10px;
      box-sizing: border-box;
      color: #FFFFFF;
      cursor: pointer;
      font-family: Inter,Helvetica,"Apple Color Emoji","Segoe UI Emoji",NotoColorEmoji,"Noto Color Emoji","Segoe UI Symbol","Android Emoji",EmojiSymbols,-apple-system,system-ui,"Segoe UI",Roboto,"Helvetica Neue","Noto Sans",sans-serif;
      font-size: 16px;
      font-weight: 700;
      line-height: 24px;
      opacity: 1;
      outline: 0 solid transparent;
      padding: 8px 18px;
      user-select: none;
      -webkit-user-select: none;
      touch-action: manipulation;
      width: fit-content;
      word-break: break-word;
      border: 0;
  } */
</style>