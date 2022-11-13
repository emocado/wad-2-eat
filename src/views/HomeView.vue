
<template>
  <main>
    <div id="menu" ref="menu">
      <div id="menu-items" ref="menus">
        <div class="menu-header">
          Eat Out
        </div>
        <div class="menu-item">
          <RouterLink class="link" to="/swipe">Eat Alone Outside?</RouterLink>
        </div>
        <div class="menu-item">
          <RouterLink class="link" to="/restaurantroulettemain">Restaurant Roulette!</RouterLink>
        </div>
        <div class="menu-item">
          <RouterLink class="link" to="/group">Eat with Friends?</RouterLink>
        </div>

        <div class="menu-header">
          Eat at Home
        </div>
        <div class="menu-item">
          <RouterLink class="link" to="/foodreciperoulette">Recipe Roulette</RouterLink>
        </div>
        <div class="menu-item">
          <RouterLink class="link" to="/mealroulettemain">Meal Roulette!</RouterLink>
        </div>
        <div class="menu-item">
          <RouterLink class="link" to="/recipe">Search for Recipe</RouterLink>
        </div>
        <div class="menu-item">
          <RouterLink class="link" to="/ingredient_filter">Search Recipe by Ingredients</RouterLink>
        </div>
        <!-- <div class="menu-item">
          <RouterLink class="link" to="/forum">Browse Forum</RouterLink>
        </div> -->
      </div>
      <div id="menu-background-pattern"></div>
      <div id="menu-background-image"></div>
    </div>
  </main>
</template>

<script>
import { RouterLink } from 'vue-router'

export default {
  components: {
    RouterLink,
  },
  mounted() {
    Array.from(this.$refs.menus.children)
      .forEach((item, index) => {
        item.onmouseover = () => {
          this.$refs.menu.dataset.activeIndex = index;
        }
      });
  }
}
</script>

<style scoped>

.menu-header {
  color: #fff;
  font-family: 'Ibarra Real Nova', serif;
  font-size: clamp(3rem, 8vw, 3rem);
  padding: clamp(0.25rem, 0.5vw, 0rem) 0rem;
}

.link {
  color: #fff;
  text-decoration: none;
  letter-spacing: 0.1rem;
}

main {
  background-color: rgb(20, 20, 20);
  margin: 0px;
}

#menu {
  align-items: start;
  display: flex;
  height: calc(100vh - 80px);
  width: 100vw;
}

#menu-items {
  margin-left: clamp(4rem, 20vw, 48rem);
  position: relative;
  z-index: 2;
}

#menu[data-active-index="0"]>#menu-background-pattern {
  background-position: 0% -11%;
}

#menu[data-active-index="1"]>#menu-background-pattern {
  background-position: 0% -22%;
}

#menu[data-active-index="2"]>#menu-background-pattern {
  background-position: 0% -33%;
}

#menu[data-active-index="3"]>#menu-background-pattern {
  background-position: 0% -44%;
}

#menu[data-active-index="4"]>#menu-background-pattern {
  background-position: 0% -55%;
}

#menu[data-active-index="5"]>#menu-background-pattern {
  background-position: 0% -66%;
}

#menu[data-active-index="6"]>#menu-background-pattern {
  background-position: 0% -77%;
}

#menu[data-active-index="7"]>#menu-background-pattern {
  background-position: 0% -88%;
}

#menu[data-active-index="8"]>#menu-background-pattern {
  background-position: 0% -100%;
}

#menu[data-active-index="5"]>#menu-background-pattern {
  background-position: 0% -100%;
}

#menu[data-active-index="0"]>#menu-background-image {
  background-position: center 45%;
}

#menu[data-active-index="1"]>#menu-background-image {
  background-position: center 50%;
}

#menu[data-active-index="2"]>#menu-background-image {
  background-position: center 55%;
}

#menu[data-active-index="3"]>#menu-background-image {
  background-position: center 60%;
}

#menu[data-active-index="4"]>#menu-background-image {
  background-position: center 65%;
}

#menu[data-active-index="5"]>#menu-background-image {
  background-position: center 70%;
}

#menu[data-active-index="6"]>#menu-background-image {
  background-position: center 75%;
}

#menu[data-active-index="7"]>#menu-background-image {
  background-position: center 80%;
}

#menu[data-active-index="8"]>#menu-background-image {
  background-position: center 85%;
}

#menu-background-pattern {
  background-image: radial-gradient(rgba(255, 255, 255, 0.1) 9%,
      transparent 9%);
  background-position: 0% 0%;
  background-size: 12vmin 12vmin;
  height: 100vh;
  left: 0px;
  position: absolute;
  top: 0px;
  transition: opacity 800ms ease,
    background-size 800ms ease,
    background-position 800ms ease;
  width: 100vw;
  z-index: 1;
}

#menu-background-image {
  background-image: url(/src/assets/foodhome.jpg);
  background-position: center 40%;
  background-size: 110vmax;
  height: 100%;
  left: 0px;
  opacity: 0.15;
  position: absolute;
  top: 0px;
  transition: opacity 800ms ease,
    background-size 800ms ease,
    background-position 800ms ease;
  width: 100%;
  z-index: 0;
}

#menu-items:hover~#menu-background-pattern {
  background-size: 11vmin 11vmin;
  opacity: 0.5;
}

#menu-items:hover~#menu-background-image {
  background-size: 100vmax;
  opacity: 0.1;
}

#menu-items:hover>.menu-item {
  opacity: 0.3;
}

#menu-items:hover>.menu-item:hover {
  opacity: 1;
}

.menu-item {
  color: white;
  cursor: pointer;
  display: block;
  font-family: 'Ibarra Real Nova', serif;
  font-size: clamp(2rem, 8vw, 2rem);
  padding: clamp(0.25rem, 0.5vw, 0rem) 0rem;
  margin-left: 50px;
  text-decoration: none;
  transition: opacity 400ms ease;
}

@media (max-width: 575px) {
  .menu-item {
    font-size: clamp(1rem, 8vw, 1rem);
  }
  .menu-header {
    font-size: clamp(2rem, 8vw, 2rem);
  }
}

/* -- YouTube Link Styles -- */

body.menu-toggled>.meta-link>span {
  color: rgb(30, 30, 30);
}

#source-link {
  bottom: 60px;
}

#source-link>i {
  color: rgb(94, 106, 210);
}

#yt-link>i {
  color: rgb(239, 83, 80);
}

.meta-link {
  align-items: center;
  backdrop-filter: blur(3px);
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  bottom: 10px;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  display: inline-flex;
  gap: 5px;
  left: 10px;
  padding: 10px 20px;
  position: fixed;
  text-decoration: none;
  transition: background-color 400ms, border-color 400ms;
  z-index: 10000;
}

.meta-link:hover {
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.meta-link>i,
.meta-link>span {
  height: 20px;
  line-height: 20px;
}

.meta-link>span {
  color: white;
  font-family: "Rubik", sans-serif;
}
</style>

