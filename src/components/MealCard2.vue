<template>

    <section class="meals">
        <div v-for="(meal, index) in meals" :key="index">
            
            <div class="meal_image" style="padding-top:20px">
                <img :src="`https://spoonacular.com/recipeImages/` + meal.id + '-636x393.jpg'" :alt="meal.strMealThumb">
            </div>

            <h5>{{ meal.title }}</h5>

            <div class="meal_paragraph">
                <!-- <p class="sub"> {{meal.sourceURL.substring(0,50)}}</p> -->
                <p class="block"> {{ meal.sourceURL }} </p>
                <p>Number Of Ingredients Used: {{ meal.usedIngredientCount }}</p>
                <p>Number Of Ingredients Missing: {{ meal.missedIngredientCount }}</p>
                <button @click="goTodetail(meal.id)" style="color:grey;text-decoration: underline;">View More</button>
                <!-- <router-link to="/RecipeInfo">link</router-link> -->
                
            </div>
            
        </div>

    </section>


</template>
    
    
<script>
import { VueElement } from 'vue';
import RecipeInfo from './RecipeInfo.vue';
import { createRouter, createWebHistory } from 'vue-router';
import { RouterLink } from 'vue-router'
export default {
    props: ['meals'],
    methods: {
        goTodetail(food) {            
            this.$router.push({ path: `/ingredient_filter/${food}`});
        }
    }

}
</script>
    
<style scoped>
* {
    font-family: 'Mali', monospace;
}

.meals {
    display: flex;
    flex-wrap: wrap;
    gap: 1em;
    justify-content: center;
    /* background: #ecf0f3; */
    
    padding: 50px 10px;
    border-radius: 10px;
}

.meal_paragraph {
    padding: 10px 30px;
    color:black;
}

.meals>* {
    background:#F3E0DC;
    flex-basis: 30%;
    min-width: 10rem;
    border: 1px solid #000;
    border-radius: 20px;
    box-shadow: -3px -3px 7px #fff, 3px 3px 5px #ceced1;
    text-align: center;
}

img {
    max-width: 100%;
    border-radius: 20px;
}

.meal_image {
    padding: 3px 50px;
}

.block {
    display: none;
}
</style> -->