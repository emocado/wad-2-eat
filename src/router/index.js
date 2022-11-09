import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import GameCardsStackComponent from "../components/GameCardsStackComponent.vue";
import MealCard from "../components/Recipe.vue"
import MealCard2 from "../components/IngredientFilter.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/swipe',
      name: 'swipe',
      component: GameCardsStackComponent
    },
    {
      path: '/recipe',
      name: 'recipe',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: MealCard
    },

    {
      path: '/ingredient_filter',
      name: 'ingredient_filter',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: MealCard2
    }
  ]
})

export default router
