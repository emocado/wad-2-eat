<template>
  <div class="cards">
    <GameCard v-for="(card, index) in cards" :key="card.id" :card="card" :is-current="index === 0" :trigger="trigger"
      @cardAccepted="$emit('cardAccepted');" @cardRejected="$emit('cardRejected');" @cardSkipped="$emit('cardSkipped');"
      @hideCard="$emit('hideCard');" />
  </div>
</template>
  
<script>
import GameCard from "./GameCard.vue";

export default {
  components: {
    GameCard
  },

  props: {
    // cards: {
    //   type: Array,
    //   required: true
    // },
    cards: {
      type: Object,
      required: true
    },
    trigger: {
      type: Number,
      required: true
    }
  },

};
</script>
  
<style lang="scss" scoped>
.cards {
  position: relative;
  display: flex;
  margin: 50px;
  width: 700px;
}


</style>
  