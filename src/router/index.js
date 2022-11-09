import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ForumView from '../views/ForumView.vue'
import Discussion from '../views/Discussion.vue'
import GameCardsStackComponent from "../components/GameCardsStackComponent.vue";
import MapView from "../components/MapView.vue";
import ChatBox from "../components/ChatBox.vue";

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
      name: 'map',
      component: MapView
    },
    {
      path: '/chat/:chatroomid',
      name: 'chat',
      component: ChatBox
    },
  ]
})

export default router
