<script setup>
import SearchJumbo from '../components/forum/SearchJumbo.vue'
import DisplayItems from '../components/forum/DisplayItems.vue'
import {ref} from 'vue';
const displayItemsRef = ref()
//add methods
const dabian = (search) => {
  displayItemsRef.value.testing(search);
}

</script>

<template>
  <main>
    <SearchJumbo @fetch_data="dabian" />
    <DisplayItems ref="displayItemsRef" page_name="forum"></DisplayItems>
  </main>
</template>


