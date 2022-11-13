<template>
  <div id="backgroundSection">
    <div class="container">
      <div v-if="!post">
        <HalfCircleSpinner />
      </div>
      <GameCardsStack v-else :cards="post" :trigger="trigger" @cardAccepted="handleCardAccepted"
        @cardRejected="handleCardRejected" @cardSkipped="handleCardSkipped" @hideCard="removeCardFromDeck" />
    </div>
    <div class="d-flex justify-content-around">
      <CrossButton @click="handleTriggerRemove" />
      <button v-if="isGroup" class="btn btn-primary" @click="$emit('doneSwipping')" style="position:absolute;">
        Done Swipping
      </button>
      <HeartButton @click="handleTriggerAdd" />
    </div>
  </div>
</template>
  
<script>
import GameCardsStack from "./GameCardsStack.vue";
import HalfCircleSpinner from "../HalfCircleSpinner.vue";
import CrossButton from "../CrossButton.vue";
import HeartButton from "../HeartButton.vue";
import axios from "axios";

export default {
  props: {
    isGroup: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  components: {
    GameCardsStack,
    HalfCircleSpinner,
    CrossButton,
    HeartButton,
  },
  emits: ["cardAccepted", "cardRejected", "cardSkipped", "hideCard", "doneSwipping"],

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

#backgroundSection {
  background-image: url(../../assets/swipeRestaurantTemplate.webp);
  /* Full height */
  height: 100%;
  /* Center and scale the image nicely */
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  padding-top: 50px;
  padding-bottom: 550px;
}

#swipeButton {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding-bottom: 50px;
}
</style>
  