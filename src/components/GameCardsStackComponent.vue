<template>
  <!-- todo add loading spinner if loading is true -->
  <div class="container">
    <GameCardsStack v-if="!loading" :cards="post" :trigger="trigger" @cardAccepted="handleCardAccepted"
      @cardRejected="handleCardRejected" @cardSkipped="handleCardSkipped" @hideCard="removeCardFromDeck" />
    <div v-else-if="loading">
      <HalfCircleSpinner />
    </div>
    <!-- <div>
      <HalfCircleSpinner/>
    </div> -->
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
import HalfCircleSpinner from "./HalfCircleSpinner.vue";
// import axios from "axios";
import data from "./data.js";

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
      loading: false,
      post: data,
      error: null,
    };
  },

  created() {
    // watch the params of the route to fetch the data again
    this.$watch(
      () => this.$route.params,
      () => {
        // this.fetchData()
      },
      // fetch the data when the view is created and the data is
      // already being observed
      { immediate: true }
    )
  },

  methods: {
    fetchData() {
      console.log(import.meta.env.VITE_TRAVEL_ADVISOR_API_KEY);
      let self = this
      self.error = self.post = null
      self.loading = true
      
      // comment out axios as the limit for api is only 500 per month

      // eslint-disable-next-line no-unused-vars
      const options = {
        method: "GET",
        url: "https://travel-advisor.p.rapidapi.com/restaurants/list-by-latlng",
        params: {
          latitude: "1.296568",
          longitude: "103.852119",
          limit: "10",
          currency: "SGD",
          distance: "1",
          open_now: "false",
          lunit: "km",
          lang: "en_US",
        },
        headers: {
          "X-RapidAPI-Key":
            import.meta.env.VITE_TRAVEL_ADVISOR_API_KEY,
          "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
        },
      };


      // axios
      //   .request(options)
      //   .then(function (response) {
      //     console.log(response.data.data);
      //     self.loading = false;
      //     self.post = response.data.data;
      //   })
      //   .catch(function (error) {
      //     // self.error = "Something went wrong " + error.toString();
      //     console.log(error);
      //   });

      self.loading = false;
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
        this.$router.push({ path: `/map/locationid/${this.post[0].location_id}` });
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
  