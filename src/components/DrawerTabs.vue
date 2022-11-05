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
import { defineComponent } from 'vue';
export default defineComponent({
  props: {
    selectedKey: {
      type: String,
      default: '1',
    },
  },
  data() {
    return {
      activeKey: this.selectedKey,
    }
  },

});
</script>
<style>
  #rc-tabs-2-panel-2 {
    padding: 10px;
  }
</style>