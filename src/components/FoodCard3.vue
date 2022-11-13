<template>
  <div class="card m-1" style="width: 20rem;">
    <div v-if="Object.keys(post).length !== 0" >
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
    <div v-else class="d-flex justify-content-center align-items center h-100">
      <HalfCircleSpinner/>
    </div>
</div>
</template>
  
<script>
import axios from 'axios';
import HalfCircleSpinner from "./HalfCircleSpinner.vue";
export default {
  components: {
    HalfCircleSpinner,
  },
  props: {
    locationId: {
      type: String,
      required: true
    },
  },

  data() {
    return {
      post: {},
    }
  },
  mounted() {
    const url = `https://api.yelp.com/v3/businesses/${this.locationId}`
    const proxy = "https://cors-anywhere.herokuapp.com/"
    axios
      .get(proxy+url, {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_YELP_API_KEY}`,
        },
      })
      .then((response) => {
        const data = response.data;
        this.post = {
          photoURL: data.image_url,
          name: data.name,
          address: data.location.address1,
          likes: data.rating,
          webURL: data.url,
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    handleDirections() {
      this.$router.push({ path: `/map/locationid/${this.locationId}` })
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