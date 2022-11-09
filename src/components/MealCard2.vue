<!-- <template>

    <section class="meals">
        <div v-for="(meal,index) in meals" :key="index">

            <h1>{{meal.strMeal}}</h1>
            <div class="meal_image">
                <img :src="meal.strMealThumb" :alt="meal.strMealThumb">
            </div>

            <div class="meal_paragraph">
                <p class="sub"> {{meal.strInstructions.substring(0,50)}}</p>
                <p class="block"> {{meal.strInstructions}} </p>
                <button @click="goTodetail(meal.strMealThumb)" >View More</button>
                <router-link to="/RecipeInfo">link</router-link>
            </div>
        </div>

    </section>


</template>
    
    
<script>
import { VueElement } from 'vue';
import RecipeInfo from './RecipeInfo.vue';
export default {
    props: ['meals'],
    methods: {
        goTodetail(food){
            this.$router.addRoute({ name: 'RecipeInfo', path: '/RecipeInfo', component: RecipeInfo })
            console.log(meal)
            // window.location.replace("/recipe/RecipeInfo")

            

        }
    }

}
</script>
    
<style scoped>
* {
    font-family: 'Roboto Mono', monospace;
}

.meals {
    display: flex;
    flex-wrap: wrap;
    gap: 1em;
    justify-content: center;
    background: #ecf0f3;
    padding: 50px 10px;
    border-radius: 10px;
}

.meal_paragraph {
    padding: 10px 30px;
}

.meals>* {
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


<template>

    <section class="meals">
        <div v-for="(meal,index) in meals" :key="index">

            <h1>{{meal.title}}</h1>
            <div class="meal_image">
                <img :src="`https://spoonacular.com/recipeImages/`+meal.id+'-636x393.jpg'" :alt="meal.strMealThumb">
            </div>

            <div class="meal_paragraph">
                <!-- <p class="sub"> {{meal.sourceURL.substring(0,50)}}</p> -->
                <p class="block"> {{meal.sourceURL}} </p>
                <p>Missed IngredientCount: {{meal.missedIngredientCount}}</p>
                <p>Missed Ingredients: </p>
                
                <p v-for="(ingredients,index) in meal.missedIngredients" :key="index">{{ingredients.name}}  </p>
                <button @click="goTodetail(meal.id)" >View More</button>
                <!-- <router-link to="/RecipeInfo">link</router-link> -->
            </div>
        </div>

    </section>


</template>
    
    
<script>
import { VueElement } from 'vue';
import RecipeInfo from './RecipeInfo.vue';
import axios from  "axios";
export default {
    props: ['meals'],
    methods: {
        goTodetail(food){
            // this.$router.addRoute({ name: 'RecipeInfo', path: '/RecipeInfo', component: RecipeInfo })
            
            axios.get(`https://api.spoonacular.com/recipes/`+food+`/information?apiKey=52e7e5abc8da43e3b0722667e3cec54d&includeNutrition=false`)
                        .then(res => {
                            
                        window.location.replace(res.data.sourceUrl)
                        // this.meals = res.data;
                        // console.log(res.data)
                        // if(this.meals==null){
                          
                        // }
                    }).catch(err => console.log(err));
            

            

        }
    }

}
</script>
    
<style scoped>
* {
    font-family: 'Roboto Mono', monospace;
}

.meals {
    display: flex;
    flex-wrap: wrap;
    gap: 1em;
    justify-content: center;
    background: #ecf0f3;
    padding: 50px 10px;
    border-radius: 10px;
}

.meal_paragraph {
    padding: 10px 30px;
}

.meals>* {
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