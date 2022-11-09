<template>
  <div class="container">
      <div v-if="!post">
        <HalfCircleSpinner />
      </div>
      <GameCardsStack v-else :cards="post" :trigger="trigger" @cardAccepted="handleCardAccepted"
        @cardRejected="handleCardRejected" @cardSkipped="handleCardSkipped" @hideCard="removeCardFromDeck" />
  </div>
  <div class="d-flex justify-content-around">
    <button class="btn text-danger" @click="handleTriggerRemove">
      <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="currentColor" class="bi bi-x-circle-fill"
        viewBox="0 0 16 16">
        <path
          d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
      </svg>
    </button>
    <button class="btn btn-outline-danger rounded-circle heart" @click="handleTriggerAdd">
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-heart-fill"
        viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
      </svg>
    </button>
  </div>
</template>
  
<script>
import GameCardsStack from "./GameCardsStack.vue";
import HalfCircleSpinner from "../HalfCircleSpinner.vue";
import axios from "axios";

export default {
  components: {
    GameCardsStack,
    HalfCircleSpinner,
  },
  emits: ["cardAccepted", "cardRejected", "cardSkipped", "hideCard"],

  data() {
    return {
      visibleCards: [{ name: "bricklane", location_id: "1" }, { name: "macdonald", location_id: "2" }, { name: "subway", location_id: "3" }, { name: "wolfrik", location_id: "4" }],
      trigger: 0,
      post: null,
    };
  },

  mounted() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.fetchData(position.coords.latitude, position.coords.longitude)
      },
      error => {
        console.log(error.message);
      },
    )
  },

  methods: {
    fetchData(lat, lng) {
      let self = this

      const url = "/v3/businesses/search"
      // const proxy = "https://cors-anywhere.herokuapp.com/"

      axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_YELP_API_KEY}`,
          },
          params: {
            term: "food",
            limit: 50,
            radius: 1000,
            latitude: lat,
            longitude: lng,
          },
        })
        .then(function (response) {
          self.post = response.data.businesses;
        })
        .catch(function (error) {
          console.log(error);
        });

    },

    handleTriggerAdd() {
      this.trigger += 1
    },
    handleTriggerRemove() {
      this.trigger -= 1
    },
    handleCardAccepted() {
      console.log("handleCardAccepted");
      if (!this.$route.params.chatroomid) {
        this.$router.push({ path: `/map/locationid/${this.post[0].id}` });
      }
      this.$emit("cardAccepted", this.post[0]);
    },
    handleCardRejected() {
      console.log("handleCardRejected");
    },
    handleCardSkipped() {
      console.log("handleCardSkipped");
    },
    removeCardFromDeck() {
      console.log("removeCardFromDeck");
      this.visibleCards.shift();
      this.post.shift();
    },
  }
};
</script>
  
<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  width: calc(100vw - 16px);
  height: 500px;
  align-items: center;
}

.heart {
  width: 70px;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
  