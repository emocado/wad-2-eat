<template>
  <a-tabs v-model:activeKey="activeKey">
    <a-tab-pane key="1" tab="Chat">
      <slot name="tab1"></slot>
    </a-tab-pane>
    <a-tab-pane key="2" tab="Group Select" style="padding: 10px;">
      <slot name="tab2"></slot>
    </a-tab-pane>
    <!-- <template #leftExtra>
      <a-button class="tabs-extra-demo-button">Left Extra Action</a-button>
    </template>
    <template #rightExtra>
      <a-button>Right Extra Action</a-button>
    </template> -->
  </a-tabs>
</template>
<script>
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    return {
      activeKey: ref('1'),
    };
  },

});
</script>
<style>
  #rc-tabs-2-panel-2 {
    padding: 10px;
  }
</style>