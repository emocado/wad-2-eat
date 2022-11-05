<template>
  <div @click="showDrawer">
    <TeamOutlined v-if="titleIcon === 'group'" class="trigger" />
    <ChatIcon v-if="titleIcon === 'chat'" class="trigger" />
    <span>{{title}}</span>
  </div>
  <a-drawer v-model:visible="visible" title="Chat Group" :closable="false"
    :footer-style="{ textAlign: 'right' }" @close="onClose">
    <slot name="firstDrawer"></slot>
    <a-drawer v-model:visible="childrenDrawer" title="Group Selection" :closable="false">
      <slot name="SeconDrawer"></slot>
    </a-drawer>

    <template #footer>
      <a-button style="margin-right: 8px" @click="onClose">Cancel</a-button>
      <a-button type="primary" @click="showChildrenDrawer">{{altTitle}}</a-button>
    </template>
  </a-drawer>
</template>
<script>
import { defineComponent, ref } from 'vue';
import { TeamOutlined } from '@ant-design/icons-vue'
import ChatIcon from '../icons/ChatIcon.vue'

export default defineComponent({
  components: {
    TeamOutlined,
    ChatIcon,
  },

  props: {
    titleIcon: {
      type: String,
      default: 'chat',
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

  computed: {
    title() {
      return this.titleIcon === 'group' ? 'Group Selection' : 'Chat Group';
    },
    altTitle() {
      return this.titleIcon === 'group' ? 'Chat Group' : 'Group Selection';
    },
  },
});
</script>
  
<style scoped>
</style>
  