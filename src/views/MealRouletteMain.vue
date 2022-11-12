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
                      this.displayDiv += '<div class="card-body mt-3 mb-3 bg-light bg-opacity-75 d-flex align-items-center" style="max-width: 100%;"><h3 class="text-3xl"><strong>' + meal.strMeal + '</strong></h3><img src="' + meal.strMealThumb + '" alt="meal image" class="mealImage img-fluid rounded"><p class="text-xl text-black-900 italic mt-10 mb-10"><mark>Ingredients:</mark></p><ul class="ingredientsList">';
                      for (let i = 1; i <= 20; i++) {
                          if (meal['strIngredient' + i] !== null && meal['strIngredient' + i] !== '') {
                              this.displayDiv += '<li class="ingredient">' + meal['strIngredient' + i] + '</li>';
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
                      // const newInstructions = meal.strInstructions.split(". ");
                      // const newInstructionsList = newInstructions.map((instruction) => {
                      //     return `<li>${instruction}</li>` + '<br>';
                      // });
                      // this.displayDiv += '</ul><p class="text-xl text-black-900 italic mt-10 mb-10"><mark>Instructions:</mark></p><ol class="instructionsList">' + newInstructionsList.join("") + '</ol></div>';
                  });
              }

                // // case where there is only 1 meal different from the searchMeal
                // else if (response.data.meals.length === 1) {
                //     this.searchMeals = response.data.meals;
                //     this.displayDiv = '';
                //     this.searchMeals.forEach((meal) => {
                //         this.displayDiv += '<div class="card mt-3 mb-3 bg-light bg-opacity-75 d-flex align-items-center" style="max-width: 100%;"><h3 class="text-3xl"><strong>' + meal.strMeal + '</strong></h3><img src="' + meal.strMealThumb + '" alt="meal image" class="mealImage img-fluid rounded"><p class="text-xl text-black-900 italic mt-10 mb-10"><mark>Ingredients:</mark></p><ul class="ingredientsList">';
                //         for (let i = 1; i <= 20; i++) {
                //             if (meal['strIngredient' + i] !== null && meal['strIngredient' + i] !== '') {
                //                 this.displayDiv += '<li class="ingredient">' + meal['strIngredient' + i] + '</li>';
                //             }
                //         }
                //         // number the strInstructions to make it easier to read
                //         let strInstructions = meal.strInstructions;
                //         let strInstructionsArray = strInstructions.split('. ');
                //         let strInstructionsArrayLength = strInstructionsArray.length;
                //         let strInstructionsArrayNumbered = [];
                //         for (let i = 0; i < strInstructionsArrayLength; i++) {
                //             strInstructionsArrayNumbered.push(i + 1 + '. ' + strInstructionsArray[i] + '<br>');
                //         }
                //         strInstructions = strInstructionsArrayNumbered.join('');
                //         this.displayDiv += '</ul><p class="text-xl text-black-900 italic mt-10 mb-10"><mark>Instructions:</mark></p><p class="instructions">' + strInstructions + '</p></div>';

                //         // const newInstructions = meal.strInstructions.split(". ");
                //         // const newInstructionsList = newInstructions.map((instruction) => {
                //         //     return `<li>${instruction}</li>` + '<br>';
                //         // });
                //         // this.displayDiv += '</ul><p class="text-xl text-black-900 italic mt-10 mb-10"><mark>Instructions:</mark></p><ol class="instructionsList">' + newInstructionsList.join("") + '</ol></div>';
                //     });
                // }
              // }

              // case where there is no meal different from the searchMeal
              else {
                  this.displayDiv = '<div class="card mt-3 mb-3 bg-danger bg-opacity-75 d-flex align-items-center" style="max-width: 100%;"><h3 class="text-3xl"><strong>Sorry, no meal found!</strong></h3></div>';
              }
              // else {
              //     this.displayDiv = '<p class="text-3xl text-black-900 italic mt-10 mb-10"><mark>Sorry, no meal found for this search.</mark></p>';
              // }



              // where there are possible results, then random generate the index of the result

              // if (response.data.meals) {
              //     const randomIndex = Math.floor(Math.random() * response.data.meals.length);
              //     const randomMeal = response.data.meals[randomIndex];
                  
              //     const ingredients = [];
              //     // Get all ingredients from the object. Up to 20
              //     for (let i = 1; i <= 20; i++) {
              //         if (randomMeal[`strIngredient${i}`]) {
              //             ingredients.push(
              //                 `${randomMeal[`strIngredient${i}`]} - ${randomMeal[`strMeasure${i}`]}`
              //             );
              //         } else {
              //             // Stop if no more ingredients
              //             break;
              //         }
              //     }

              //     // Build output
              //     // splice the ${meal.strIntructions} in list format and display inside the card div as steps to cook

              //     const newInstructions = randomMeal.strInstructions.split(". ");
              //     const newInstructionsList = newInstructions.map((instruction) => {
              //         return `<li>${instruction}</li>`;
              //     });
              //     // console.log(newInstructionsList);

              //     const newInnerHTML = `
              //         <div class="font-mono">
              //             <div class="card mt-3 mb-3 bg-light bg-opacity-75" style="max-width: 100%;">
              //                 <div class="row g-0">
              //                     <div class="col-sm-12 col-md-6 col-lg-5">
              //                         <img src="${randomMeal.strMealThumb}" class="img-fluid rounded" alt="MealImage">
              //                     </div>

              //                     <div class="col-sm-12 col-md-3 col-lg-3">
              //                         <div class="card-body d-flex align-items-center">
              //                             <h5 class="card-title text-center"><mark>${randomMeal.strMeal}</mark></h5>
              //                             ${randomMeal.strCategory ? `<p class="card-text text-xl"><strong>Category:</strong> ${randomMeal.strCategory}</p>` : ''}
              //                             ${randomMeal.strArea ? `<p class="card-text text-xl"><strong>Area:</strong> ${randomMeal.strArea}</p>` : ''}
              //                             ${randomMeal.strTags ? `<p class="card-text text-xl"><strong>Tags:</strong> ${randomMeal.strTags.split(',').join(', ')}</p>` : ''}
              //                             <p class="card-text text-decoration-underline"><a class="btn btn-warning btn-md" style="background-image: linear-gradient(to right,yellow,white,orange);" href="${randomMeal.strSource}"><medium>More Information About Recipe</medium></a></p>
              //                         </div>
              //                     </div>

              //                     <div class="col-sm-12 col-md-3 col-lg-4">
              //                         <div class="card-body d-flex justify-content-center">
              //                             <h4 class="card-title text-center"><strong><mark>Try this recipe with the following ingredients:</mark></strong></h4>
              //                             <ul class="list-group list-group-flush text-center">
              //                                 ${ingredients.map(ing => `<li class="list-group-item">${ing}</li>`).join('')}
              //                             </ul>
              //                         </div>
              //                     </div>
              //                 </div>
              //             </div>

              //             <div class="card mb-3 bg-light bg-opacity-75" style="max-width: 100%;">
              //                 <div class="row g-0">
              //                     <div class="col-sm-12 col-md-6 col-lg-4">
              //                         <div class="card-body">
              //                             <h5 class="card-title d-flex justify-content-center"><mark>Instructions</mark></h5>
              //                             <div class="d-flex justify-content-center">
              //                                 <ol class="space-y-5 max-w-md list-decimal list-inside text-dark-700 dark:text-dark-400">
              //                                     ${newInstructionsList.join('')}
              //                                 </ol>
              //                             </div>
              //                         </div>
              //                     </div>
              //                     <div class="col-sm-12 col-md-6 col-lg-8">
              //                         <div class="card-body">
              //                             <div class="card-title d-flex justify-content-center"><mark>Video Recipe</mark></div>
              //                                 <div class="card-body text-secondary">
              //                                     ${randomMeal.strYoutube
              //                                 ? `
              //                                     <div class="videoWrapper d-flex justify-content-center">
              //                                         <iframe width="853" height="505"
              //                                         src="https://www.youtube.com/embed/${randomMeal.strYoutube.slice(
              //                                             -11)}">
              //                                         </iframe>
              //                                     </div>
              //                                 </div>
              //                             </div>
              //                         </div>`
              //                         : ''}
              //                     </div>
              //                 </div>
              //             </div>
              //         </div>
              //         `;

              //     this.displayDiv = newInnerHTML;

              // } 
              
              // else {
              //     this.displayDiv = `
              //     <div class="font-mono">
              //         <div class="card mt-3 mb-3 bg-light bg-opacity-75" style="max-width: 100%;">
              //             <div class="row g-0">
              //                 <div class="col">
              //                     <div class="card-body d-flex align-items-center">
              //                         <h5 class="card-title text-center"><mark>Sorry, we couldn't find any results for ${searchMeal}</mark></h5>
              //                     </div>
              //                 </div>
              //             </div>
              //         </div>
              //     </div>
              //     `;
              // }
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