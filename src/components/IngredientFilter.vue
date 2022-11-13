<template>
    <div class="background">
        <div class="row">
            <div class="col-3"></div>
            <div class="col-3">
                <h3 style="color:white; text-align: center; font-size: 3vw">Ingredients Available</h3>
                <draggable style="height:80%;" class="list-group" :list="list1" group="people" @change="log" itemKey="name">

                    <template #item="{ element }">
                        <div class="list-group-item w-100" v-html="element.name"> </div>
                    </template>
                </draggable>
            </div>


            <div class="col-3">
                <h3 style="color:white; text-align: center; font-size: 3vw;">Added Ingredients</h3>
                <draggable style="height:80%" class="list-group" :list="list2" group="people" @change="log" itemKey="name">
                    <template #item="{ element }">
                        <div class="list-group-item w-100" v-html="element.name"> </div>
                    </template>
                </draggable>
                <div class="col-3"></div>
            </div>
        </div>
        

        <!-- <rawDisplayer class="col-3" :value="list1" title="List 1" />
  
        <rawDisplayer class="col-3" :value="list2" title="List 2" /> -->
        <div class="row">
            <div class="col-12 p-3">

            </div>
        </div>

        <div class="row">
            <div class="col-3">

            </div>

            <div class="col-6">
                Add your own ingredient here:
                <input v-model="extra" style="color:black">
                <button class="btn btn-secondary" @click="add">Add</button>

            </div>

            <div class="col-3">


            </div>

        </div>

        <div class="row">
            <div class="col-3">

            </div>

            <div class="col-6">
                <span>Current Ingredient In Pot 🍲: </span>
                <span class="item" v-for="(item, index) in list2">
                    <span v-if="index != list2.length-1">{{item.id}}, </span>
                    <span v-else="">{{item.id}}</span> 
                </span>
            </div>

            <div class="col-3">


            </div>

        </div>

        <div class="row">
            <div class="col-12 p-3">

            </div>
        </div>


        <div class="row" style="margin: 0;">
            <div class='col-3'></div>
            <div class='col-6'>
                <button style="color:white; border: none;" @click="filter(list2)" type="button" class="btn btn-secondary w-100">Filter</button>
            </div>
            <div class='col-3'></div>

        </div>
        
        <MealCard2 :meals="meals"></MealCard2>
        
    </div>

</template>
<script>
import draggable from "vuedraggable";
import axios from "axios"
import MealCard2 from "./MealCard2.vue"


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
                { name: "<img src='src/assets/apple.png' width=100 height=100 style='margin-left:auto; margin-right:auto'>", id:'apple'},
                { name: "<img src='src/assets/broccoli.png' width=100 height=100 style='margin-left:auto; margin-right:auto'>", id:'broccoli' },
                { name: "<img src='src/assets/potato.png' width=100 height=100 style='margin-left:auto; margin-right:auto'>" ,id:'potato'},
                { name: "<img src='src/assets/mushroom.png' width=100 height=100 style='margin-left:auto; margin-right:auto'>", id:'mushroom' },
                { name: "<img src='src/assets/chicken.png' width=100 height=100 style='margin-left:auto; margin-right:auto'>", id:'chicken' },
                { name: "<img src='src/assets/carrot.png' width=100 height=100 style='margin-left:auto; margin-right:auto'>", id:'carrot' }
            ],
            list2: [
                //   { name: "Brocolli"},
                //   { name: "Carrot"},
                //   { name: "Orange"}
            ],
            search: "",
            checkedIngredients: [],
            meals: [],
            extra:'',
            pot:[]
        };
    },
    methods: {
        add: function () {
            const url = "https://spoonacular.com/cdn/ingredients_500x500/"+this.extra+".jpg"
            const newing = { name: "<img src='"+url+"' width=100 style='min-height: 100px; margin-left:auto; margin-right:auto;'>", id:this.extra }
            this.list1.push(newing);
            console.log(newing)
        },
        replace: function () {
            this.list = [{ name: "Carrot" }];
        },
        clone: function (el) {
            return {
                name: el.name + " cloned"
            };
        },
        log: function (evt) {
            window.console.log(evt);

        },
        filter: function (list2) {
        
            const checkedIngredients = []
            for (const item in list2) {
                checkedIngredients.push(list2[item].id)
            }

            console.log(checkedIngredients)

            let ingredientlist = ''
            for (let ingredients of checkedIngredients) {
                ingredientlist += ingredients
                ingredientlist += ','
            }

            console.log('the ingredient is '+ingredientlist)

            ingredientlist.slice(0, -1)
            axios.get(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=52e7e5abc8da43e3b0722667e3cec54d&ingredients=` + ingredientlist)
                .then(res => {
                    this.meals = res.data;
                    console.log(res.data)
                }).catch(err => console.log(err));

        }, components: { MealCard2 }
    },


};
</script>

<style>
.background {
    background-color: #5C2018;
    color: white;
    padding: 30px 20px 40px 20px;
    margin-bottom: 20px;
    background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("../assets/recipebackground.jpg");
    background-size: cover;
    /* background-position: center center; */
    min-height: 100vh;
}

.form-control {
    background-color: #F3E0DC;
    border: 1px solid #ffffff;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border-top-left-radius: 30px;
    border-bottom-left-radius: 30px;
    border-top-right-radius: 30px;
    border-bottom-right-radius: 30px;
    margin: 0;
    width: 300px;
    height: 48px;
}

/* .border {
    border-style: groove;
} */
</style>