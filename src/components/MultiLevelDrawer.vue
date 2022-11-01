<template>
  <menu-fold-outlined @click="showDrawer" class="trigger" />
  <a-drawer v-model:visible="visible" title="Chat Group" :closable="false"
    :footer-style="{ textAlign: 'right' }" @close="onClose">
    <slot name="chatBox"></slot>
    <a-drawer v-model:visible="childrenDrawer" title="Group Selection" :closable="false">
      <slot name="groupSelection"></slot>
      <!-- <a-button type="primary" @click="showChildrenDrawer">This is two-level drawer</a-button> -->
    </a-drawer>

    <template #footer>
      <a-button style="margin-right: 8px" @click="onClose">Cancel</a-button>
      <a-button type="primary" @click="showChildrenDrawer">Group Selection</a-button>
    </template>
  </a-drawer>
</template>
<script>
import { defineComponent, ref } from 'vue';
import { MenuFoldOutlined } from '@ant-design/icons-vue'

export default defineComponent({
  components: {
    MenuFoldOutlined,
  },
  setup() {
    const visible = ref(false);

    const childrenDrawer = ref(false);

    const showDrawer = () => {
      visible.value = true;
    };
    const onClose = () => {
      visible.value = false;
    };
    const showChildrenDrawer = () => {
      childrenDrawer.value = true;
    };
    return {
      visible,
      childrenDrawer,
      showDrawer,
      onClose,
      showChildrenDrawer,
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
  