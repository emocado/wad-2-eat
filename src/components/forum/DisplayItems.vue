<!-- eslint-disable no-unused-vars -->
<!-- eslint-disable vue/require-v-for-key -->
<template>
  <div v-if="page_name == 'forum'">
    <div v-for="obj of allPosts" class="card mb-3 mx-4 p-4">
      <a :href="'comment/'+obj.id">
        <div class="row g-0">
          <div class=" col-md-6">
            <img :src="obj.image" class="foodpic img-fluid rounded-start" alt="...">
          </div>
          <div class="col-md-6 p-4">
            <div class="card-body">
              <h3 class="card-title">{{obj.title}}</h3>
              <p class="card-text">{{obj.description}}</p>
              <p class="card-text"><small class="text-muted">{{obj.host}}</small></p>
            </div>
          </div>
        </div>
      </a>
    </div>
  </div>
  <div v-if="page_name == 'discussion'">
    <div v-for="obj of allPosts" class="card mb-3 mx-4 p-4">
      <a :href="'/comment/'+obj.id">
        <div class="row g-0">
          <div class=" col-12">
            <img :src="obj.image" class="foodpic img-fluid rounded-start" alt="...">
          </div>
          <div class="col-12  d-none d-lg-block">
            <div class="card-body">
              <h3 class="card-title">{{obj.title}}</h3>
              <p class="card-text"><small class="text-muted">{{obj.host}}</small></p>
            </div>
          </div>
        </div>
      </a>
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
        console.log(toAdd);
        this.allPosts.push(toAdd);
      });
      console.log(this.allPosts);
    }
  },
  created() {
    this.allPosts=getPosts()
  },
}
</script>
<style scoped>
.foodpic {
  width: 100%;
}

.card {
  border-radius: 20px;
  border-color: rgba(234, 156, 169, 0.5);
  opacity: 80%;
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