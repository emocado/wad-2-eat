<template>
  <a-layout style="min-height: 100vh">
    <a-layout>
      <a-layout-content style="margin: 0 16px">
        <div>
          <GameCardsStackComponentVue isGroup @doneSwipping="doneSwipping" @cardAccepted="handleCardAccepted" />
        </div>
      </a-layout-content>
    </a-layout>
    <a-layout-sider class="sider" theme="light" v-model:collapsed="collapsed" collapsible reverseArrow>
      <div class="logo" />
      <a-menu v-if="width >= 320" v-model:selectedKeys="selectedKeys" mode="inline">
        <a-menu-item key="1">
          <MultiLevelDrawerVue titleIcon="chat">
            <template v-slot:firstDrawer>
              <div class="chatBoxParent">
                <ChatBox />
              </div>
            </template>
            <template v-slot:SeconDrawer>
              <FoodCard v-for="(restaurant, index) in restaurants" :post="restaurant" :key="index" />
            </template>
          </MultiLevelDrawerVue>
        </a-menu-item>
        <a-menu-item key="2">
          <MultiLevelDrawerVue titleIcon="group">
            <template v-slot:firstDrawer>
              <FoodCard v-for="(restaurant, index) in restaurants" :post="restaurant" :key="index" />
            </template>
            <template v-slot:SeconDrawer>
              <div class="chatBoxParent">
                <ChatBox />
              </div>
            </template>
          </MultiLevelDrawerVue>
        </a-menu-item>
      </a-menu>

      <a-menu v-else v-model:selectedKeys="selectedKeys" mode="inline">
        <a-menu-item key="1">
          <SingleDrawer titleIcon="chat">
            <DrawerTabs selectedKey="1">
              <template v-slot:tab1>
                <div class="chatBoxParent" style="height: 80vh;">
                  <ChatBox />
                </div>
              </template>
              <template v-slot:tab2>
                <FoodCard v-for="(restaurant, index) in restaurants" :post="restaurant" :key="index" />
              </template>
            </DrawerTabs>
          </SingleDrawer>
        </a-menu-item>
        <a-menu-item key="2">
          <SingleDrawer titleIcon="group">
            <DrawerTabs selectedKey="2">
              <template v-slot:tab1>
                <div class="chatBoxParent" style="height: 80vh;">
                  <ChatBox />
                </div>
              </template>
              <template v-slot:tab2>
                <FoodCard v-for="(restaurant, index) in restaurants" :post="restaurant" :key="index" />
              </template>
            </DrawerTabs>
          </SingleDrawer>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
  </a-layout>
</template>
<script>
import { defineComponent, ref } from 'vue';
import GameCardsStackComponentVue from '../components/swipe/GameCardsStackComponent.vue';
import MultiLevelDrawerVue from '../components/sidebar/MultiLevelDrawer.vue';
import FoodCard from '../components/sidebar/FoodCard.vue';
import ChatBox from '../components/sidebar/chat/ChatBox.vue';
import SingleDrawer from '../components/sidebar/SingleDrawer.vue';
import DrawerTabs from '../components/sidebar/DrawerTabs.vue';
import { useRoute } from 'vue-router';
import { useRestaurant, useChatRoom } from '@/firebase'
export default defineComponent({
  components: {
    GameCardsStackComponentVue,
    MultiLevelDrawerVue,
    ChatBox,
    FoodCard,
    SingleDrawer,
    DrawerTabs,
  },

  data() {
    return {
      collapsed: ref(false),
      selectedKeys: ref(['1']),
      width: window.innerWidth >= 1400 ? 520 : window.innerWidth >= 768 ? 320 : window.innerWidth >= 576 ? 220 : 200,
    };
  },

  setup() {
    const route = useRoute()
    const chatRoomId = route.params.chatroomid;
    const { restaurants, addRestaurants } = useRestaurant(chatRoomId)
    const { users, doneSwippingFirebase } = useChatRoom(chatRoomId);
    return { restaurants, addRestaurants, chatRoomId, users, doneSwippingFirebase }
  },
  mounted() {
    window.addEventListener("resize", this.myEventHandler);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.myEventHandler);
  },
  methods: {
    handleCardAccepted(card) {
      this.addRestaurants(card, this.chatRoomId)
    },
    myEventHandler() {
      this.width = window.innerWidth >= 1400 ? 520 : window.innerWidth >= 768 ? 320 : window.innerWidth >= 576 ? 220 : 200
    },
    doneSwipping() {
      this.doneSwippingFirebase(this.chatRoomId)
      this.$router.push({ path: `/groupresult/${this.chatRoomId}` });
    }
  },

});
</script>
<style>
#components-layout-demo-side .logo {
  height: 32px;
  margin: 16px;
  background: rgba(255, 255, 255, 0.3);
}

.site-layout .site-layout-background {
  background: #fff;
}

[data-theme='dark'] .site-layout .site-layout-background {
  background: #141414;
}

.sider {
  z-index: 10;
}
</style>