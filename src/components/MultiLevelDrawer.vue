<template>
    <a class="btn btn-primary" @click="showDrawer">{{title}}</a>
    <a-drawer
      v-model:visible="visible"
      title="Multi-level drawer"
      width="520"
      :closable="false"
      :footer-style="{ textAlign: 'right' }"
      @close="onClose"
    >
      <slot></slot>
      <a-drawer
        v-model:visible="childrenDrawer"
        title="Two-level Drawer"
        width="320"
        :closable="false"
      >
        <a-button type="primary" @click="showChildrenDrawer">This is two-level drawer</a-button>
      </a-drawer>
  
      <template #footer>
        <a-button style="margin-right: 8px" @click="onClose">Cancel</a-button>
        <a-button type="primary" @click="showChildrenDrawer">Group Selection</a-button>
      </template>
    </a-drawer>
  </template>
  <script>
  import { defineComponent, ref } from 'vue';
  
  export default defineComponent({
    props: {
      title: {
        type: String,
        default: 'Multi-level drawer',
      },
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
  
  