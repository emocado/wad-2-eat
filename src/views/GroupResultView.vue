<template>
  <div id="groupResult" class="container-fluid">
    <div v-if="isDoneSwipping">
      <h1 v-if="selectedRestaurant" class="text-center">Restaurant Selected</h1>
      <div v-if="selectedRestaurant" class="d-flex justify-content-center align-items-center">
        <FoodCard2 :post="selectedRestaurant" />
      </div>
    </div>
    <div v-else class="d-flex flex-wrap">
      <FoodCard2 v-for="(restaurant, index) in restaurants" :post="restaurant" :key="index" />
    </div>
    <div>
      <ChatBox />
    </div>
  </div>
</template>
<script>
import ChatBox from '../components/sidebar/chat/ChatBox.vue';
import FoodCard2 from '../components/FoodCard2.vue';
import { useRoute } from 'vue-router';
import { useRestaurant, useChatRoom } from '@/firebase'
import axios from 'axios';
export default {
  components: {
    ChatBox,
    FoodCard2,
  },
  data() {
    return {
      selectedRestaurant: null,
    }
  },
  setup() {
    const route = useRoute()
    const chatRoomId = route.params.chatroomid;
    const { restaurants, addRestaurants } = useRestaurant(chatRoomId)
    const { users } = useChatRoom(chatRoomId);
    return { restaurants, addRestaurants, chatRoomId, users }
  },
  computed: {
    isDoneSwipping() {
      const isDone = this.users.every(user => user.doneSwipping)
      if (isDone) {
        this.selectedRestaurants()
      }
      return isDone
    },
  },
  methods: {
    selectedRestaurants() {
      const url = "/decision"
      const newRestaurantsArr = this.restaurants.map((restaurant, index) => {
        return JSON.parse(`{ "${restaurant.locationId}": {
          "index": "${index}",
          "likes": "${restaurant.userId}"
          } }`)
      })
      
      const newRestaurantsObj = {}
      for (const item of newRestaurantsArr) {
        newRestaurantsObj[Object.keys(item)[0]] = item[Object.keys(item)[0]]
      }

      axios.post(url, newRestaurantsObj)
        .then(response => {
          const locationId = response.data
          console.log(locationId);
          this.selectedRestaurant = this.restaurants.find(restaurant => restaurant.locationId === locationId)
        })
        .catch(error => {
          console.log(error.message);
        });
    }
  },
}
</script>
<style scoped>
#groupResult {
  background-image: url(../assets/mealRouletteTemplate.webp);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
}
</style>