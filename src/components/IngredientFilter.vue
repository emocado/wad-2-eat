<!-- <template>
      
    <div id="meals">
        <input type="text" v-model="search" class="search">
        <button @click="fetchData()">search</button>
    
        <MealCard :meals="meals"></MealCard>
    </div>
       
    </template>
    
    <script>
    import axios from  "axios"
    import MealCard from "./MealCard.vue"
    
        export default{
        
        data() {
            return {
                search:"",
                meals: []
            };
        },
        methods: {
            fetchData() {
                axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${this.search}`)
                    .then(res => {
                    this.meals = res.data.meals;
                    console.log(res.data);
                    if(this.meals==null){
                      
                    }
                }).catch(err => console.log(err));
                
            }
        },
        components: { MealCard }
    }
    </script>
    <style scoped>
       
    input{
        width: 20rem;
        height: 2rem;
        margin: 30px 10px;
    }
    button{
        height: 2rem;
    }
    .loading{
        display: grid;
        place-content: center;
    }
    input:focus{
        outline: 1px solid #669;
    }
    </style> -->
    
    

<template>

    <div>
        
        
        <input type="checkbox" id="carrot" value="carrot" v-model="checkedIngredients">
        <label for="carrot">Carrot</label>
        <input type="checkbox" id="egg" value="egg" v-model="checkedIngredients">
        <label for="egg">Egg</label>
        <input type="checkbox" id="vegetable" value="vegetable" v-model="checkedIngredients">
        <label for="vegetable">Vegetable</label>
   
        <br>
        <span>Checked Ingredients: {{ checkedIngredients }}</span>

        <button @click="fetchData(checkedIngredients)">Filter</button>

        <MealCard2 :meals="meals"></MealCard2>
    </div>

</template>
        
<script>
import axios from "axios"
import MealCard2 from "./MealCard2.vue"

export default {

    data() {
        return {
            search: "",
            checkedIngredients: [],
            meals: []
        };
    },
    methods: {
        fetchData(checkedIngredients) {
            let ingredientlist=''
            for (let ingredients of checkedIngredients){
                ingredientlist+=ingredients
                ingredientlist+='&'
            }

            ingredientlist.slice(0,-1)
            axios.get(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=52e7e5abc8da43e3b0722667e3cec54d&ingredients=` + ingredientlist)
                .then(res => {
                    this.meals = res.data;
                    console.log(res.data)
                    if (this.meals == null) {

                    }
                }).catch(err => console.log(err));

        }


    },
    components: { MealCard2 }
}
</script>
<style scoped>
input {
    width: 20rem;
    height: 2rem;
    margin: 30px 10px;
}

button {
    height: 2rem;
}

.loading {
    display: grid;
    place-content: center;
}

input:focus {
    outline: 1px solid #669;
}
</style>
        
         