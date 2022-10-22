<template>
  <div>
    <div class="card" style="width: 18rem;">
      <img :src="post.photo?.images.original ?? 'https://static.thehoneycombers.com/wp-content/uploads/sites/2/2020/07/local-food-singapore-dishes-on-a-table-900x643.png'" class="card-img-top" alt="restaurant image">
      <div class="card-body">
        <h5 class="card-title">{{post.name}}</h5>
        <p class="card-text">
          {{post?.rating ? post?.rating + ' Rating'  : 'No Rating'}}
        </p>
        <p class="card-text">
          {{post?.description ?? 'No Description'}}
        </p>
        <p class="card-text">
          {{post?.address}}
        </p>
        <p class="card-text">
          {{post?.distance_string}}
        </p>
        <a :href="post.web_url" class="btn btn-primary">See Reviews</a>
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

  created() {
    console.log(this.post);
  },
}
</script>
<style lang="">
  
</style>