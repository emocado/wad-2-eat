<template>
  <menu-fold-outlined @click="showDrawer" class="trigger" />
  <a-drawer width="100%" v-model:visible="visible" placement="right"
    @after-visible-change="afterVisibleChange">
    <slot></slot>
  </a-drawer>
</template>
<script>
import { defineComponent, ref } from 'vue';
import { MenuFoldOutlined } from '@ant-design/icons-vue'
export default defineComponent({
  components: {
    MenuFoldOutlined,
  },
  props: {
    title: {
      type: String,
      default: 'Single-level drawer',
    },
  },
  setup() {
    const visible = ref(false);

    const afterVisibleChange = bool => {
      console.log('visible', bool);
    };

    const showDrawer = () => {
      visible.value = true;
    };

    return {
      visible,
      afterVisibleChange,
      showDrawer,
    };
  },

});
</script>

<style scoped>
  .trigger {
    font-size: 30px;
    padding: 20px;
    cursor: pointer;
  }
</style>