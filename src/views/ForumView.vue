<script setup>
import SearchJumbo from '../components/forum/SearchJumbo.vue'
import DisplayItems from '../components/forum/DisplayItems.vue'
import {ref} from 'vue';
const displayItemsRef = ref()
//add methods
const dabian = (search) => {
  displayItemsRef.value.filteringPosts(search);
}

</script>

<template>
  <main id="background">
    <SearchJumbo @fetch_data="dabian" />
    <DisplayItems ref="displayItemsRef" page_name="forum"></DisplayItems>
  </main>
</template>

<style scoped>

  #background {
    margin:0;
    padding:0;
    font-family:"arial",heletica,sans-serif;
    font-size:12px;
    background:url('https://img.freepik.com/free-photo/baby-food-frame-pink-background_23-2148580476.jpg?w=2000&t=st=1668265819~exp=1668266419~hmac=78bf74fc5549967da3bb6d0a28e8ff281986fe49102eb135b11e80214868f7f9') repeat ;
    -webkit-animation: 10s linear 0s both none infinite animate;
    -moz-animation: 10s linear 0s both none infinite animate;
    -ms-animation: 10s linear 0s both none infinite animate;
    -o-animation: 10s linear 0s both none infinite animate;
    animation: 10s linear s both none infinite animate;

  }

  @-webkit-keyframes animate {
    from {background-position:0 0;}
    to {background-position: 500px 0;}
  }

  @-moz-keyframes animate {
    from {background-position:0 0;}
    to {background-position: 500px 0;}
  }

  @-ms-keyframes animate {
    from {background-position:0 0;}
    to {background-position: 500px 0;}
  }

  @-o-keyframes animate {
    from {background-position:0 0;}
    to {background-position: 500px 0;}
  }

  @keyframes animate {
    from {background-position:0 0;}
    to {background-position: 500px 0;}
  }
  
</style>


