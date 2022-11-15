<!-- eslint-disable no-unused-vars -->
<!-- eslint-disable vue/require-v-for-key -->

<template>
  <div v-if="page_name == 'forum'">
    <div v-for="obj of allPosts" class="card mb-3 mx-4 p-4 overflow-hidden" style="height:300px;width:auto;object-fit:contain">
      <RouterLink class="nav-link active" :to="'/comment/'+obj.id">
      <!-- <a :href="'comment/'+obj.id"> -->
        <div class="row g-0">
          <div class=" col-sm-3 h-50-sm d-flex justify-content-center " style="max-height:50%">
            <img :src="obj.image" class="foodpic img-fluid rounded-start" alt="..." style="object-fit: scale-down;">
          </div>
          <div class="col-sm-9 p-4-sm" >
            <div class="card-body mt-3 px-4" style="max-height:250px">
              <h1 class="card-title d-flex justify-content-center justify-content-start-sm">{{obj.title}}</h1>
              <p class="card-text fs-5 d-none d-sm-block" style=" overflow: hidden;">{{obj.description}}</p>
              <p class="card-text d-none d-sm-block pb-3"><small class="text-muted">{{obj.host}}</small></p>
            </div>
          </div>
        </div>
      <!-- </a> -->
    </RouterLink>
    </div>
  </div>
  <div v-if="page_name == 'discussion'">
    <div v-for="obj of allPosts" class="card mb-3 mx-4 p-4">
      <!-- <a :href="'/comment/'+obj.id"> -->
        <!-- <RouterLink class="nav-link active"  :to="'/comment/'+obj.id"> -->
        <div @click="change_post(obj.id)" class="row g-0">
          <div class=" col-12">
            <img :src="obj.image" class="foodpic img-fluid rounded-start" alt="..." style="object-fit:fill">
          </div>
          <div class="col-12  d-none d-lg-block">
            <div class="card-body">
              <h3 class="card-title d-flex justify-content-center">{{obj.title}}</h3>
              <p class="card-text"><small class="text-muted">{{obj.host}}</small></p>
            </div>
          </div>
        </div>
        <!-- </RouterLink> -->
      <!-- </a> -->
    </div>
  </div>
</template>

<script>

import {
getFirestore,
collection,
getDocs,
query,
} from 'firebase/firestore'
import {getPosts} from '../../firebase';
const db = getFirestore()
export default {
props:["page_name"],
data() {
  return {
    allPosts:[],
    originalPosts:[],
  };
},
methods: {
  async getData() {
    const posts = query(
      collection(db, 'forum_post')
    );

    const querySnapshot = await getDocs(posts)

    querySnapshot.forEach((doc) => {
      var toAdd = doc.data();
      toAdd['id'] = doc.id;
      this.allPosts.push(toAdd);
    });
    this.filterPost = this.allPosts;
  },
  change_post(id){
    this.$router.push({name: 'comment', params: {postid: id}});
  },

  filteringPosts(search){
    if(search == ""){
      this.allPosts=this.originalPosts;
    }else{
      this.allPosts = this.originalPosts.filter((post) => {
        return post.description.toLowerCase().includes(search.toLowerCase()) || post.title.toLowerCase().includes(search.toLowerCase()) || post.host.toLowerCase().includes(search.toLowerCase());
      });
    }
  }

},
created() {
  this.allPosts=getPosts()
  this.originalPosts = getPosts();
},
}
</script>
<style scoped>
/* media below width of 575 */
@media (max-width: 575px) {
.foodpic {
  height: 150px;
  background-color: black;
}
}
.foodpic {
  max-width: 100%;
  max-height:250px;
}


.card {
border-radius: 20px;
border-color: rgba(234, 156, 169, 0.5);
opacity: 70%;
transition: 0.3s;
}

a:link{
text-decoration: none;
}

.card:hover {
border: 8px solid rgba(234, 156, 169, 0.5);
border-radius: 20px;
opacity: 100%;
box-shadow: 0 10px 20px rgba(0, 0, 0, 0.6);
transition: 0.3s
}
</style>