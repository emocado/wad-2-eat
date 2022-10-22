<template>
  <div class="message my-3">
    <span v-if="!sender">{{ name }}</span>
    <div class="d-flex" :class="sender ? 'flex-row-reverse' : ''">
      <AvatarComponent class="my-1" :src="photoUrl" />
      <div class="text-box" :class="sender ? 'primary' : 'primary-light'">
        <slot />
      </div>
    </div>
  </div>
</template>
  
<script>
import AvatarComponent from './AvatarComponent.vue'
export default {
  components: { AvatarComponent },
  props: {
    name: { type: String, default: '' },
    photoUrl: { type: String, default: '' },
    sender: { type: Boolean, default: false }
  }
}
</script>

<style scoped>

.text-box {
  padding: 10px;
  border-radius: 10px;
  margin: 0 10px;
  max-width: 70%;
  word-break: break-word;
}

.primary {
  background-color: #FF9494;
}

.primary-light {
  background-color: #FFD1D1;
}

.primary-lighter {
  background-color: #FFE3E1;
}

.secondary {
  background-color: #FFF5E4;
}
</style>