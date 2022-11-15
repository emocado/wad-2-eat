<template>
  <div @click="showDrawer">
    <TeamOutlined v-if="titleIcon === 'group'" />
    <ChatIcon v-if="titleIcon === 'chat'" />
    <span>{{titleIcon}}</span>
  </div>
  <a-drawer width="100%" v-model:visible="visible" placement="right" closable
    @after-visible-change="afterVisibleChange">
    <slot></slot>
    <template #footer>
      <a-button style="width: 100%;" @click="onClose">Cancel</a-button>
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

    const afterVisibleChange = bool => {
      console.log('visible', bool);
    };

    const showDrawer = () => {
      visible.value = true;
    };

    const onClose = () => {
      visible.value = false;
    };

    return {
      visible,
      afterVisibleChange,
      showDrawer,
      onClose,
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
  .trigger {
    font-size: 30px;
    padding: 20px;
    cursor: pointer;
  }
</style>