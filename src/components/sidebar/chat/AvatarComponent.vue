<template>
  <img class="avatar" :src="src" />
</template>
  
<script>
export default {
  props: { src: { type: String, default: '' } }
}
</script>

<style scoped>
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}
</style>