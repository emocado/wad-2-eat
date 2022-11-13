<!-- <template>

    <div class="background">

        
        <input style='align-items: center;' type="checkbox" id="carrot" value="carrot" v-model="checkedIngredients">
        <label for="carrot"><img src="../assets/carrot.png" alt="carrot" width="100" height="100"></label>
    
        <input type="checkbox" id="egg" value="egg" v-model="checkedIngredients">
        <label for="egg"><img src="../assets/egg.png" alt="egg" width="150" height="150"></label>

        <input type="checkbox" id="brocolli" value="brocolli" v-model="checkedIngredients">
        <label for="brocolli"><img src="../assets/broccoli.png" alt="brocolli" width="100" height="100"></label>

        <input type="checkbox" id="apple" value="apple" v-model="checkedIngredients">
        <label for="apple"><img src="../assets/apple.png" alt="apple" width="125" height="125"></label>

        <input type="checkbox" id="potato" value="potato" v-model="checkedIngredients">
        <label for="potato"><img src="../assets/potato.png" alt="potato" width="100" height="100"></label>

        <input type="checkbox" id="mushroom" value="mushroom" v-model="checkedIngredients">
        <label for="mushroom"><img src="../assets/mushroom.png" alt="mushroom" width="140" height="140"></label>

        <input type="checkbox" id="chicken" value="chicken" v-model="checkedIngredients">
        <label for="chicken"><img src="../assets/chicken.png" alt="chicken" width="80" height="80"></label>

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
            let ingredientlist = ''
            for (let ingredients of checkedIngredients) {
                ingredientlist += ingredients
                ingredientlist += '&'
            }

            ingredientlist.slice(0, -1)
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
    height:20px;
    width:20px;
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

.background{
    background-color: #5C2018;
    color: white;
    padding: 30px 20px 40px 20px;
    margin-bottom: 20px;
    background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("../assets/recipebackground.jpg");
    background-size: cover;
    /* background-position: center center; */
    min-height: 100vh;}    



</style> -->

<template>
    <div class="background">
    <div class="row">
        
      <div class="col-3">
        <h3 style="color:white">Ingredient To Add</h3>
        <draggable
          class="list-group"
          :list="list1"
          group="people"
          @change="log"
          itemKey="name"
        >
          <template #item="{ element}">
            <div class="list-group-item" v-html="element.name"> </div>
          </template>
        </draggable>
      </div>
  
      <div class="col-3">
        <h3 style="color:white">Added Ingredients</h3>
        <draggable
          class="list-group"
          :list="list2"
          group="people"
          @change="log"
          itemKey="name"
        >
          <template #item="{ element}">
            <div class="list-group-item" v-html="element.name"> </div>
          </template>
        </draggable>
      </div>
  
      <!-- <rawDisplayer class="col-3" :value="list1" title="List 1" />
  
      <rawDisplayer class="col-3" :value="list2" title="List 2" /> -->

      <button style="color:white" @click="filter(list2)" type="button">Filter</button>
    </div>
    </div>
    <MealCard :meals="meals"></MealCard>
  </template>
  <script>
  import draggable from "vuedraggable";
  import axios from "axios"
  import MealCard2 from "./MealCard2.vue";
  
  export default {
    name: "two-lists",
    display: "Two Lists",
    order: 1,
    components: {
      draggable
    },
    data() {
      return {
        list1: [
          { name: "<img src='src/assets/apple.png' width=100 height=100 style='margin-left:auto; margin-right:auto'>"},
          { name: "<img src='src/assets/broccoli.png' width=100 height=100 style='margin-left:auto; margin-right:auto'>"},
          { name: "<img src='src/assets/potato.png' width=100 height=100 style='margin-left:auto; margin-right:auto'>"},
          { name: "<img src='src/assets/mushroom.png' width=100 height=100 style='margin-left:auto; margin-right:auto'>"}
        ],
        list2: [
        //   { name: "Brocolli"},
        //   { name: "Carrot"},
        //   { name: "Orange"}
        ],
        search: "",
        checkedIngredients: [],
        meals: []
      };
    },
    methods: {
      add: function() {
        this.list.push({ name: "Apple" });
      },
      replace: function() {
        this.list = [{ name: "Carrot" }];
      },
      clone: function(el) {
        return {
          name: el.name + " cloned"
        };
      },
      log: function(evt) {
        window.console.log(evt);
      },
      filter: function(list2){
        const checkedIngredients=[]
        for(const item in list2){
            checkedIngredients.push(list2[item].name)
        }

        let ingredientlist = ''
            for (let ingredients of checkedIngredients) {
                ingredientlist += ingredients
                ingredientlist += ','
            }

            ingredientlist.slice(0, -1)
            axios.get(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=52e7e5abc8da43e3b0722667e3cec54d&ingredients=` + ingredientlist)
                .then(res => {
                    this.meals = res.data;
                    console.log(res.data)
                    if (this.meals == null) {

                    }
                }).catch(err => console.log(err));

      }
    },
    
      
};
  </script>

<style>
    .background{
    background: linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ),url("../assets/recipebackground.jpg");
    }

    .border{
        border-style: groove;
    }
</style>