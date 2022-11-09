<template>
  <div>
    <div class="card" style="width: 20rem;">
      <img id="postImage" :src="post?.image_url ?? 'https://static.thehoneycombers.com/wp-content/uploads/sites/2/2020/07/local-food-singapore-dishes-on-a-table-900x643.png'" class="card-img-top" alt="restaurant image">
      <div class="card-body">
        <h5 class="card-title">{{post?.name}}</h5>
        <p class="card-text">
          {{post?.rating ? 'Rating: ' + post?.rating : 'No Rating'}}
        </p>
        <p class="card-text">
          {{post?.location?.address1 ? 'Address: ' + post?.location?.address1 : 'No Address'}}
        </p>
        <p class="card-text">
          {{post?.price ? 'Price: ' + post?.price : 'No Price'}}
        </p>
        <button @click="handleReview" class="btn btn-primary">See Reviews</button>
      </div>
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
    handleReview() {
      // open the review in a new tab
      window.open(this.post.url, '_blank')
    }
  },
}
</script>
<style scoped>
  #postImage {
    height: 200px;
    object-fit: cover;
  }
</style>