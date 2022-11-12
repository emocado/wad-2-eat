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
            ></div>
          </template>
        </Roulette>
      </div>

      <div 
        v-show="result"
        class="absolute bottom-2 left-1/2 transform -translate-x-1/2"
      >
        <button class="btn btn-xs mx-2" @click="onHardReset()"><span style="background-color: lightcoral; padding: 5px 5px;">Refresh Roulette Session </span></button>
        <button class="btn btn-xs mx-2" @click="onSoftReset()"><span style="background-color: lightblue; padding: 5px 5px;">Re-spin from the beginning</span></button>
      </div>
    </div>

    <p class="text-xl text-black-900 italic mt-10 mb-10"><mark>A customizable roulette wheel to combat pesky indecisiveness</mark></p>

    <div class="tabs tabs-boxed justify-center pt-3 pb-3">
      <a class="tab" :class="{'tab-active': managerId === 1 }" @click="managerId = 1">Items manager</a> 
      <a class="tab" :class="{'tab-active': managerId === 2 }" @click="managerId = 2">Wheel manager</a>
    </div>

    <div class="divider"></div> 

    <ItemsManager
      v-if="managerId === 1"
      class="item-manager overflow-scroll lg:overflow-auto"
      :initial-items="items"
      :initial-first-item-index="firstItemIndex"
      @update-items="onSoftReset"
    />
    <WheelManager
      v-if="managerId === 2"
      :initial-settings="wheelSettings"
      @hard-reset="onHardReset"
    />

  </div>

</template>

<script>
import ItemsManager from "../components/roulette/ItemsManager.vue";
import WheelManager from "../components/roulette/WheelManager.vue";
import Roulette from "../components/roulette/Roulette.vue";
import wheelData from "../components/roulette/mealRouletteMainData.js";
import axios from "axios";

export default {
  name: "RouletteMain", 

  components: {
    Roulette,
    ItemsManager,
    WheelManager
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
                      this.displayDiv += '<div class="card-body mt-5 mb-5 pt-5 pb-5 bg-light bg-opacity-75 d-flex align-items-center" style="max-width: 100%;"><h3 class="text-3xl"><strong>' + meal.strMeal + '</strong></h3><img src="' + meal.strMealThumb + '" alt="meal image" class="mealImage img-fluid rounded"><p class="text-xl text-black-900 italic mt-10 mb-10"><mark>Ingredients:</mark></p><ul class="ingredientsList">';
                      for (let i = 1; i <= 20; i++) {
                          if (meal['strIngredient' + i] !== null && meal['strIngredient' + i] !== '') {
                              this.displayDiv += '<li class="ingredient">' + `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}` + '</li>';
                          }
                      }
                      // number the strInstructions to make it easier to read by setting the step numbers for each instruction steps

                      let strInstructions = meal.strInstructions;
                      let strInstructionsArray = strInstructions.split('. ');
                      let strInstructionsArrayLength = strInstructionsArray.length;
                      let strInstructionsArrayNumbered = [];
                      for (let i = 0; i < strInstructionsArrayLength; i++) {
                          strInstructionsArrayNumbered.push(i + 1 + '. ' + strInstructionsArray[i] + '<br>');
                      }
                      strInstructions = strInstructionsArrayNumbered.join('');
                      this.displayDiv += '</ul><p class="text-xl text-black-900 italic mt-10 mb-10"><mark>Instructions:</mark></p><p class="instructions">' + strInstructions + '</p></div>';
                  });
              }

              // case where there is no meal different from the searchMeal
              else {
                  this.displayDiv = '<div class="card mt-3 mb-3 bg-danger bg-opacity-75 d-flex align-items-center" style="max-width: 100%;"><h3 class="text-3xl"><strong>Sorry, no meal found!</strong></h3></div>';
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