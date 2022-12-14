import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ForumView from '../views/ForumView.vue'
import Discussion from '../views/Discussion.vue'
import GameCardsStackComponent from "../components/swipe/GameCardsStackComponent.vue";
import MapView from "../views/MapView.vue";
import GroupSwipeView from "../views/GroupSwipeView.vue";
import GroupRoomView from "../views/GroupRoomView.vue";
import FoodRecipeRoulette from "../components/roulette/FoodRecipeRoulette.vue";
import MealRouletteView from "../views/MealRouletteMain.vue";
import RestaurantRouletteView from '../views/RestaurantRouletteMain.vue';
import RecipeView from "../views/RecipeView.vue"
import IngredientFilter from "../components/IngredientFilter.vue"
import RecipeInfo from '../components/RecipeInfo.vue';
import GroupResultView from '../views/GroupResultView.vue';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/swipe',
      name: 'swipe',
      component: GameCardsStackComponent
    },
    {
      path: '/foodreciperoulette',
      name: 'foodreciperoulette',
      component: FoodRecipeRoulette
    },
    {
      path: '/chat/:chatroomid/swipe',
      name: 'swipeGroup',
      component: GroupSwipeView
    },
    {
      path: '/forum',
      name:'forum',
      component: ForumView
    },
    {
      path: '/comment/:postid',
      name:'comment',
      component: Discussion,
      props: true
    },
    {
      path: '/map/locationid/:locationid',
      name: 'singleMap',
      component: MapView
    },
    {
      path: '/chat/:chatroomid/map/locationid/:locationid',
      name: 'map',
      component: MapView
    },
    {
      path: '/group',
      name: 'group',
      component: GroupRoomView
    },
    {
      path: '/mealroulettemain',
      name: 'mealroulettemain',
      component: MealRouletteView
    },
    {
      path: '/restaurantroulettemain',
      name: 'restaurantroulettemain',
      component: RestaurantRouletteView
    },
    {
      path: '/recipe',
      name: 'recipe',
      component: RecipeView
    },

    {
      path: '/ingredient_filter',
      name: 'ingredient_filter',
      component: IngredientFilter
    },
    {
      path: '/ingredient_filter/:id',
      name: 'ingredient_filter_id',
      component: RecipeInfo
    },
    {
      path: '/recipe/:id',
      name: 'RecipeInfo',
      component: RecipeInfo
    },
    {
      path: '/groupresult/:chatroomid',
      name: 'GroupResult',
      component: GroupResultView
    }
  ]
})

export default router
