<template>
  <div class="card m-1" style="width: 20rem;">
  <img id="foodImage" :src="post.photoURL !== '' ? post.photoURL : 'https://static.thehoneycombers.com/wp-content/uploads/sites/2/2020/07/local-food-singapore-dishes-on-a-table-900x643.png'" class="card-img-top" alt="foodcard">
  <div class="card-body">
    <h5 class="card-title">{{ post.name }}</h5>
    <p class="card-text" style="margin: 0;">Addresss: {{ post?.address }}</p>
    <p class="card-text">
      {{ post.likes }}
      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-heart-fill d-inline text-danger"
        viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
      </svg>
      <button @click="handleReview" class="btn btn-primary mx-2">Reviews</button>
      <button @click="handleDirections" class="btn btn-primary mx-2">Direction</button>
    </p>
  </div>
</div>
</template>
  
<script>
export default {
  props: {
    post: {
      type: Object,
      required: true
    },
  },
  methods: {
    handleDirections() {
      this.$router.push({ path: `/chat/${this.post.chatRoomId}/map/locationid/${this.post.locationId}` })
    },
    handleReview() {
      // open the review in a new tab
      window.open(this.post.webURL, '_blank')
    }
  },
}
</script>
  
<style scoped>
#foodImage {
  height: 230px;
  object-fit: cover;
}
</style>