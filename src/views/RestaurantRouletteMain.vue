<template>
  <div v-if="items[0].name != '' " >
    <div class="rouletteMain" data-theme="lemonade">
      <h1 class="text-4xl mt-4">Restaurant Roulette</h1>
      <!-- display the wheel results here  -->
      <div class="rouletteResults" v-if="result">
        <div class="rouletteResult">
          <h2 class="text-2xl mt-4 mb-5"><mark>Final Results:</mark></h2>
          <h3 class="text-3xl"><RouterLink class="router-link px-2 py-2" :to="`/map/locationid/${result.restaurantId}`" style="background-color:azure;">{{ result.htmlContent }}</RouterLink></h3>
        </div>
      </div>
      <div class="py-5 relative">
        <div class="wheel-anim" :class="{'wheel-anim-started': startAnim}">
          <Roulette
            v-if="wheelActive"
            ref="wheel"
            @click="launchWheel"
            :items="items"
            :first-item-index="firstItemIndex"
            :centered-indicator="wheelSettings.centeredIndicator"
            :indicator-position="wheelSettings.indicatorPosition"
            :size="wheelSettings.size"
            :display-Shadow="wheelSettings.displayShadow"
            :display-border="wheelSettings.displayBorder"
            :display-indicator="wheelSettings.displayIndicator"
            :duration="wheelSettings.duration"
            :result-variation="wheelSettings.resultVariation"
            :easing="wheelSettings.easing"
            @wheel-start="wheelStartedCallback"
            @wheel-end="wheelEndedCallback"
            :counter-clockwise="wheelSettings.counterClockwise"
            :horizontal-content="wheelSettings.horizontalContent"
            :base-display="wheelSettings.baseDisplay"
            :base-size="wheelSettings.baseSize"
            :base-display-indicator="wheelSettings.baseDisplayIndicator"
            :base-display-shadow="wheelSettings.baseDisplayShadow"
            :base-background="wheelSettings.baseBackground"
          >
            <template #baseContent>
              <div
                v-if="wheelSettings.baseHtmlContent"
                v-html="wheelSettings.baseHtmlContent"
                id="font_prob"
              ></div>
            </template>
          </Roulette>
        </div>

      </div>
      <p class="text-xl text-black-900 italic mt-10 mb-10"><mark>A flexible fortune wheel to combat pesky indecisiveness</mark></p>
      <div class="divider" style="margin-top: 250px;"></div>
    </div>
  </div>
  <div style="height:100vh" class="d-flex justify-content-center align-items-center" v-else>
    <HalfCircleSpinner/>
  </div>
</template>

<script>
import Roulette from "../components/roulette/Roulette.vue";
import wheelData from "../components/roulette/restaurantRouletteMainData.js";
import { RouterLink } from 'vue-router'
import HalfCircleSpinner from '../components/HalfCircleSpinner.vue'
import axios from "axios";

export default {
  name: "RouletteMain",

  components: {
    Roulette,
    RouterLink,
    HalfCircleSpinner
  },

  data () {
    return {
      ...wheelData,
      wheelActive: true,
      startAnim: false,
      managerId: 1,
      result: null
    }
  },

  mounted () {
    setTimeout(() =>{
      this.startAnim = true;
    }, 500)

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
    launchWheel() {
      this.$refs.wheel.launchWheel();
    },
    wheelStartedCallback() {
      console.log("wheel started !");
    },
    wheelEndedCallback(resultItem) {
      console.log("wheel ended !");
      this.result = resultItem;
      this.$refs.wheel.reset();
    },
    onSoftReset(newItemList) {
      this.items = newItemList || this.items;
      this.$refs.wheel.reset();
    },
    onHardReset() {
      this.wheelActive = false;
      this.result = null;
      setTimeout(() => {
        this.wheelActive = true;
      }, 10);
    },
    fetchData(lat, lng) {
      let self = this
      // const url = "https://api.yelp.com/v3/businesses/search"
      // const proxy = "https://cors-anywhere.herokuapp.com/"
      const url = "/api/search"
      axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_YELP_API_KEY}`,
          },
          params: {
            term: "food",
            limit: 10,
            radius: 1000,
            latitude: lat,
            longitude: lng,
          },
        })
        .then(function (response) {
          // self.items = response.data.businesses;
          const allPost = response.data.businesses
          self.items = self.items.map((item, index) => {
            return {
              ...item,
              name: allPost[index].name,
              htmlContent: allPost[index].name,
              restaurantId: allPost[index].id,
            }
          })
        })
        .catch(function (error) {
          console.log(error);
        });
      },
  }
}
</script>

<style lang="scss" scoped>
@media(max-width: 650px) {
  #font_prob{
    font-size:8px;
  }
}
@media(min-width:651px){
  #font_prob{
    font-size:16px;
  }
}
.wheel-anim {
  transition: transform 4s cubic-bezier(.58,-0.26,.24,1.11);
  transform: rotate(-1800deg) scale(1.25);

  &-started {
    transform: rotate(0deg) scale(1);
  }
}

  .rouletteMain {
    font-family: 'Ubuntu', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    overflow-x: hidden;
    background-image: url(../assets/restaurantRouletteTemplate.webp);
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
    padding-top: 70px;
    padding-bottom: 50px;
  }

  .router-link {
    text-decoration: none;
  }
  
</style>