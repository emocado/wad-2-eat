<template>
  <div class="rouletteMain" data-theme="autumn">

    <h1 class="text-4xl mt-4">Meal Roulette</h1>
    <!-- display the wheel results here  -->
    <div class="rouletteResults" v-if="result">
      <div class="rouletteResult">
        <h2 class="text-2xl mb-5"><mark>Final Results:</mark></h2>
        <h3 class="text-3xl"><strong><button style="text-decoration: underline; font-style: italic; background-color: yellow; padding: 10px 10px;" @click="retrieveSearchResults(result.htmlContent)">{{ result.htmlContent }}</button></strong></h3>
        <div v-html="displayDiv" class="displayMeal"></div>
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

    <p class="text-xl text-black-900 italic mt-10 mb-10"><mark>A customizable roulette wheel to combat pesky indecisiveness</mark></p>

    <div class="divider"></div> 

    <ItemsManager
      v-if="managerId === 1"
      class="item-manager overflow-scroll lg:overflow-auto"
      :initial-items="items"
      :initial-first-item-index="firstItemIndex"
      @update-items="onSoftReset"
    />

  </div>

</template>

<script>
import ItemsManager from "../components/roulette/ItemsManager.vue";
import Roulette from "../components/roulette/Roulette.vue";
import wheelData from "../components/roulette/mealRouletteMainData.js";
import axios from "axios";

export default {
  name: "RouletteMain", 

  components: {
    Roulette,
    ItemsManager,
  },

  data () {
    return {
      ...wheelData,
      wheelActive: true,
      startAnim: false,
      managerId: 1,
      result: null,
      displayDiv: '',
      searchMeals: []
    }
  },

  mounted () {
    setTimeout(() =>{
      this.startAnim = true;
    }, 500)
  },

  methods: {
    launchWheel() {
      this.$refs.wheel.launchWheel();
    },
    wheelStartedCallback() {
      console.log("wheel started !");
    },
    wheelEndedCallback(resultItem) {
      console.log("wheel ended !", resultItem);
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
    retrieveSearchResults(searchMeal) {

      const url = "https://www.themealdb.com/api/json/v1/1/search.php?s=" + searchMeal;
      axios
          .get(url)
          .then((response) => {

              // case where there are 2 or more meals different from the searchMeal
              if (searchMeal !== '' && response.data.meals !== null && response.data.meals.length > 0) {
                  this.searchMeals = response.data.meals;
                  this.displayDiv = '';
                  this.searchMeals.forEach((meal) => {
                      this.displayDiv += '<div class="card-body mt-5 mb-5 pt-5 pb-5 bg-light bg-opacity-75 d-flex align-items-center" style="max-width: 100%;"><h3 class="text-3xl bg-success" style="text-decoration: underline; padding: 10px 10px;"><strong>' + meal.strMeal + '</strong></h3><img src="' + meal.strMealThumb + '" alt="meal image" class="mealImage img-fluid rounded">';
                      this.displayDiv += '<p class="card-text text-decoration-underline mt-5"><a class="btn btn-info btn-md pt-2" href="' + meal.strSource + '"><medium>More Information About ' + meal.strMeal + '</medium></a></p></div>';
                  });
              }
              // case where there is no meal different from the searchMeal
              else {
                  this.displayDiv = '<div class="card mt-3 mb-3 bg-danger bg-opacity-75 d-flex align-items-center" style="max-width: 100%;"><h3 class="text-3xl"><strong>Sorry, no matched search meal results found!</strong></h3></div>';
                  // display alert message
                  alert("Sorry, no matched search meal results found!");
              }


          })
          .catch((error) => {
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
    background-image: url(../assets/mealRouletteTemplate.webp);
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
  }

  
</style>