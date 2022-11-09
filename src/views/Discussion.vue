<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
// import SearchJumbo from '../components/forum/SearchJumbo.vue'
import DisplayItems from '../components/forum/DisplayItems.vue'
import PostItem from '../components/forum/PostItem.vue'
</script>

<template>
  <main>
    <div class="container-fluid">
        <div class="row">
            <div class="col-4 mt-4 d-none d-md-block scrollable " style="max-width: max-content;">
                <DisplayItems page_name="discussion"></DisplayItems>
            </div>
            <div class="col col-md-8 scrollable">
                <PostItem></PostItem>
            </div>
        </div>
    </div>
  </main>
</template>

<style scoped>
.scrollable{
  overflow-y: scroll;
  height:calc(100vh - 56px);
}
</style>



