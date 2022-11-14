<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
// import SearchJumbo from '../components/forum/SearchJumbo.vue'
import DisplayItems from '../components/forum/DisplayItems.vue'
import PostItem from '../components/forum/PostItem.vue'
import HalfCircleSpinner from '../components/HalfCircleSpinner.vue';

</script>

<template>
  <main id="background">
    <div v-if="post.length != 0" class="container-fluid">
      <div class="row">
        <div class="col-3 mt-4 d-none d-md-block scrollable " style="max-width: max-content;">
          <DisplayItems page_name="discussion"></DisplayItems>
        </div>
        <div class="col col-md-9 scrollable">
          <PostItem :allPost="post"></PostItem>
        </div>
      </div>
    </div>
    <div v-else class="d-flex justify-content-center" style="align-items:center;height:100vh">
      <HalfCircleSpinner />
    </div>
  </main>
</template>

<style scoped>
.scrollable {
  overflow-y: scroll;
  height: calc(100vh - 56px);
}

#background {
  /* background-color: rgba(234, 156, 169,0.3); */
  background: linear-gradient(45deg, white, rgba(234, 156, 169, 0.3));
}
</style>

<script>
import {
  // doc,
  getFirestore,
  collection,
  getDocs,
  query,
  where,
} from 'firebase/firestore'

const db = getFirestore();

export default {
  data() {
    return {
      post: [],
    }
  },
  watch: {
    postid: {
      handler: function () {
        this.getPost()
      },
      deep: true,
    }
  },
  methods: {
    async getPost() {
      // this.post=[]
      const post = query(collection(db, "forum_post"), where("__name__", "==", this.postid));
      const querySnapshot = await getDocs(post);
      // console.log(doc(collection(db,'forum_post'),('S92YkYgAiBkwkQj5dw12')).data())
      querySnapshot.forEach((doc) => {
        this.post[0]= (doc.data());
      });
      console.log(this.post);
    },
  },
  created() {
    this.getPost();
  },
  computed: {
    postid() {
      return this.$route.params.postid;
    }
  }
}
</script>



