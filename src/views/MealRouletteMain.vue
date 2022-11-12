<template>
  <div class="rouletteMain" data-theme="autumn">

    <h1 class="text-4xl mt-4">Meal Roulette</h1>
    <!-- display the wheel results here  -->
    <div class="rouletteResults" v-if="result">
      <div class="rouletteResult">
        <h2 class="text-2xl">Final Results:</h2>
        <!-- format the results into json format -->
        <!-- underline the results.name -->

        <h3 class="text-2xl"><span style="text-decoration:underline; font-style: italic;">{{ result.htmlContent }}</span></h3>
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
        <button class="btn btn-xs mx-2" @click="onHardReset()">Refresh Roulette Session</button>
        <button class="btn btn-xs mx-2" @click="onSoftReset()">Re-spin from the beginning</button>
      </div>
    </div>

    <p class="text-xl text-black-900 italic mb-10"><mark>A customizable roulette wheel to combat pesky indecisiveness</mark></p>

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
      result: null
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