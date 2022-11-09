<script setup>
import SearchJumbo from '../components/forum/SearchJumbo.vue'
import DisplayItems from '../components/forum/DisplayItems.vue'
</script>

<template>
  <main>
    <SearchJumbo/>
    <DisplayItems @fetch_data="getData" page_name="forum"></DisplayItems> 
  </main>
</template>

