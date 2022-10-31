<template>
  <div>
    <GameCardsStackComponentVue/>
    <div class="d-flex justify-content-center">
      <MultiLevelDrawerVue title="Show Group Selection and Chat">
        <div class="chatBoxParent">
          <ChatBox/>
        </div>
      </MultiLevelDrawerVue>
    </div>
  </div>
</template>
<script>
import GameCardsStackComponentVue from './GameCardsStackComponent.vue';
import MultiLevelDrawerVue from './MultiLevelDrawer.vue';
import ChatBox from './ChatBox.vue';
export default {
  components: {
    GameCardsStackComponentVue,
    MultiLevelDrawerVue,
    ChatBox,
  },
}
</script>
<style scoped>
  .chatBoxParent {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
</style>