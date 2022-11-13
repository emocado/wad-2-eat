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

            <div class="col-6" >
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
                { name: "<img src='https://media.istockphoto.com/id/184276818/photo/red-apple.jpg?b=1&s=170667a&w=0&k=20&c=aAfiibS9LDxSzOmUvlL1vVIqq7unLny6C6uCnnEh59g=' width=100 height=100 style='margin-left:auto; margin-right:auto'>", id:'apple'},
                { name: "<img src='https://media.istockphoto.com/id/1135308302/photo/broccoli-on-white.jpg?b=1&s=170667a&w=0&k=20&c=eXhaYWV8BuAyFUWUdRxuwfaQaDpkitUVI83hJgGgBqM=' width=100 height=100 style='margin-left:auto; margin-right:auto'>", id:'broccoli' },
                { name: "<img src='https://media.istockphoto.com/id/585172756/photo/raw-potatoes.jpg?s=612x612&w=0&k=20&c=mLQgnmx3-qZrieb2HVjrOISh8H6_7_Aeb7w_eRCJCao=' width=100 style='margin-left:auto; margin-right:auto; min-height: 100px;'>" ,id:'potato'},
                { name: "<img src='https://media.istockphoto.com/id/1276597176/photo/button-mushrooms.jpg?b=1&s=170667a&w=0&k=20&c=hVMfdcFgWsDga4mGLQvMc9xprfPBT44eqZxa5A9IUtg=' width=100 height=100 style='margin-left:auto; margin-right:auto'>", id:'mushroom' },
                { name: "<img src='https://media.istockphoto.com/id/1324920494/photo/brown-chicken-with-an-egg.jpg?s=612x612&w=0&k=20&c=KVGh_20_fDALauXPblUrvQZ1x-FSRG85FlYIpkzlhzg=' width=100 style='margin-left:auto; margin-right:auto; min-height:100px;'>", id:'chicken' },
                { name: "<img src='https://media.istockphoto.com/id/619252960/photo/carrot.jpg?s=612x612&w=0&k=20&c=C-PlZ2oHW2SDCkaZXn8rg1UFdeF5ismwiy3v7uQRVKE=' width=100 height=100 style='margin-left:auto; margin-right:auto; min-height:100px;'>", id:'carrot' }
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
            const newing = { name: "<img src='"+url+"' width=100 style='min-height: 100px; margin-left:auto; margin-right:auto;' alt="+this.extra+">", id:this.extra }
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