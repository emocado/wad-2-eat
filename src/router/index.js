import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ForumView from '../views/ForumView.vue'
import GameCardsStackComponent from "../components/swipe/GameCardsStackComponent.vue";
import MapView from "../views/MapView.vue";
import GroupSwipeView from "../views/GroupSwipeView.vue";
import GroupRoomView from "../views/GroupRoomView.vue";

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
      path: '/map/locationid/:locationid',
      name: 'map',
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
  ]
})

export default router
