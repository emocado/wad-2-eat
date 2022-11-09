<template>
  <a-badge-ribbon color="red" style="height:50px; width: 100px;">
    <template #text>
      <div class="d-flex justify-content-center align-items-center pt-2">
        <span class="me-2 fs-2">{{post.likes}}</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-heart-fill"
          viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
        </svg>
      </div>
    </template>
    <a-card hoverable class="mb-2">
      <template #cover>
        <img alt="food" width="255" height="182"
          :src="post.photoURL !== '' ? post.photoURL.url : 'https://static.thehoneycombers.com/wp-content/uploads/sites/2/2020/07/local-food-singapore-dishes-on-a-table-900x643.png'" />
      </template>
      <a-card-meta :title="post.name">
        <template #description>{{ post?.address }}</template>
      </a-card-meta>
      <template #actions>
        <button @click="handleDirections" class="btn btn-primary">Direction</button>
        <button @click="handleReview" class="btn btn-primary">Reviews</button>
      </template>
    </a-card>
  </a-badge-ribbon>
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