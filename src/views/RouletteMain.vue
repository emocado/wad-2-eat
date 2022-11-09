<template>
  <div class="rouletteMain" data-theme="garden">

    <h1 class="text-4xl">Restaurant Roulette</h1>
    <div class="py-10 relative">
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
        <button class="btn btn-xs mx-2" @click="onHardReset()">Hard reset</button>
        <button class="btn btn-xs mx-2" @click="onSoftReset()">Soft reset</button>
      </div>
    </div>

    <p class="text-xl text-gray-500 italic mb-10">A customizable and flexible fortune wheel made with vue3</p>

    <div class="tabs tabs-boxed justify-center">
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
import wheelData from "../components/rouletteMainData.js";

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

<style lang="scss">
.wheel-anim {
  transition: transform 4s cubic-bezier(.58,-0.26,.24,1.11);
  transform: rotate(-1800deg) scale(1.25);

  &-started {
    transform: rotate(0deg) scale(1);
  }
}

@import url("https://fonts.googleapis.com/css?family=Muli&display=swap");
@import url("https://cdn.jsdelivr.net/npm/daisyui@2.38.1/dist/full.css");
@import url("https://cdn.jsdelivr.net/npm/tailwindcss@2.2/dist/tailwind.min.css");


  .rouletteMain {
    font-family: 'Ubuntu', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    overflow-x: hidden;
  }




</style>