import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ForumView from '../views/ForumView.vue'
import GameCardsStackComponent from "../components/GameCardsStackComponent.vue";
import MapView from "../components/MapView.vue";
import ChatBox from "../components/ChatBox.vue";
import GroupPage from "../components/GroupPage.vue";
import GroupRoom from "../components/GroupRoom.vue";

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
      component: GroupPage
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
      path: '/chat/:chatroomid',
      name: 'chat',
      component: ChatBox
    },
    {
      path: '/group',
      name: 'group',
      component: GroupRoom
    },
    {
      path: '/chat/:chatroomid/swipe/test',
      name: 'sider',
      component: GroupRoom
    },
  ]
})

export default router
