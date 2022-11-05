<template>
  <div>
    <div class="row">
      <div class="col-11" style="padding: 0;">
        <GameCardsStackComponentVue @cardAccepted="handleCardAccepted" />
      </div>
      <div class="col-1 sider">
        <MultiLevelDrawerVue v-if="width >= 320">
          <template v-slot:chatBox>
            <div class="chatBoxParent">
              <ChatBox />
            </div>
          </template>
          <template v-slot:groupSelection>
            <FoodCard v-for="(restaurant, index) in restaurants" :post="restaurant" :key="index" />
          </template>
        </MultiLevelDrawerVue>
        <SingleDrawer v-else title="Show Group Selection and Chat">
          <DrawerTabs>
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
      </div>
    </div>
    <!-- <div class="d-flex justify-content-center">
      <MultiLevelDrawerVue v-if="width >= 320" title="Show Group Selection and Chat">
        <template v-slot:chatBox>
          <div class="chatBoxParent">
            <ChatBox />
          </div>
        </template>
        <template v-slot:groupSelection>
          <FoodCard v-for="(restaurant, index) in restaurants" :post="restaurant" :key="index" />
        </template>
      </MultiLevelDrawerVue>
      <SingleDrawer v-else title="Show Group Selection and Chat">
        <DrawerTabs>
          <template v-slot:tab1>
            <div class="chatBoxParent">
              <ChatBox />
            </div>
          </template>
          <template v-slot:tab2>
            <FoodCard v-for="(restaurant, index) in restaurants" :post="restaurant" :key="index" />
          </template>
        </DrawerTabs>
      </SingleDrawer>
    </div> -->
  </div>
</template>
<script>
import GameCardsStackComponentVue from './GameCardsStackComponent.vue';
import MultiLevelDrawerVue from './MultiLevelDrawer.vue';
import FoodCard from './FoodCard.vue';
import ChatBox from './ChatBox.vue';
import SingleDrawer from './SingleDrawer.vue';
import DrawerTabs from './DrawerTabs.vue';
import { useRoute } from 'vue-router';
import { useRestaurant } from '@/firebase'

export default {
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
      width: window.innerWidth >= 1400 ? 520 : window.innerWidth >= 768 ? 320 : window.innerWidth >= 576 ? 220 : 200,
    };
  },
  setup() {
    const route = useRoute()
    const chatRoomId = route.params.chatroomid;
    console.log(chatRoomId);
    const { restaurants, addRestaurants } = useRestaurant(chatRoomId)
    return { restaurants, addRestaurants, chatRoomId }
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
  },
}
</script>
<style scoped>
.chatBoxParent {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.sider {
  padding: 0;
  border-left: 1px solid rgb(128, 125, 125);
  background-color: #FF9494;
  display: flex;
  justify-content: center;
}

.row {
  margin: 0;
  height: 92vh;
}
</style>