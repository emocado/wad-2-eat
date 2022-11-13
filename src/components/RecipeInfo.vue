<template>
<div class="background">
    <div class="container">
        <div v-html="displayDiv" class="displayMeal"></div>
    </div>
</div>
</template>

<script>
import axios from "axios";
import { routeLocationKey } from "vue-router";

// const url = window.location.href;
// const id = url.split("/").slice(-1)[0];

export default {
    name: "random_food_generator",
    data() {
        return {
            displayDiv: "",
        };
    },
    methods: {
        retriveResult(id) {
            axios
                .get("https://api.spoonacular.com/recipes/"+id+"/information?apiKey=52e7e5abc8da43e3b0722667e3cec54d")
                .then((response) => {
                    const meal = response.data
                    console.log(response.data)
                    // const meal = response.data.meals[0];
                    // console.log(meal);

                    const ingredients = [];
                    // Get all ingredients from the object. Up to 20

                    for (const ingredient of meal.extendedIngredients) {
                            ingredients.push(
                                `${ingredient.original}`
                            );                    
                    }

                    // Build output
                    // splice the ${meal.strIntructions} in list format and display inside the card div as steps to cook

                    const newInstructions = meal.analyzedInstructions[0].steps;
                    const newInstructionsList = newInstructions.map((instruction) => {
                        return `<li>${instruction.number}. ${instruction.step}</li>`;
                        
                    });

                    const summary = meal.summary.split('Try')[0]
                    
                    // console.log(newInstructionsList);

                    const newInnerHTML = `
                            <div class="card mt-3 mb-3 cardbg" style="max-width: 100%; background-color:#F3E0DC; color:black ">
                                <div class="row g-0">
                                    <div class="col-md-8">
                                        <img src="${meal.image}" width="800" height="800" class="img-fluid rounded-start" alt="MealImage">
                                    </div>
                                    <div class="col-md-4">
                                        <div class="card-body">
                                            <h5 class="card-title">${meal.title}</h5>
                                            ${meal.servings ? `<p class="card-text"><strong>Servings:</strong> ${meal.servings}</p>` : ''}
                                            ${meal.readyInMinutes ? `<p class="card-text"><strong>Preparation Time:</strong> ${meal.readyInMinutes} minutes</p>` : ''}
                                            ${meal.cuisines ? `<p class="card-text"><strong>Area:</strong> ${meal.cuisines}</p>` : ''}
                                            ${meal.diets ? `<p class="card-text"><strong>Diets:</strong> ${meal.diets}</p>` : ''}
                                            <h5>Ingredients:</h5>
                                            <ul>
                                                ${ingredients.map(ing => `<li>${ing}</li>`).join('')}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="card mb-3" style="max-width: 100%; background-color:#F3E0DC; color:black">
                                <div class="row g-0">
                                    <div class="col-md-12">
                                        <div class="card-body">
                                            <h5 class="card-title">Summary</h5>
                                            <ol>
                                                ${summary}
                                            </ol>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="card mb-3 cardbg" style="max-width: 100%; background-color:#F3E0DC; color:black">
                                <div class="row g-0">
                                    <div class="col-md-12">
                                        <div class="card-body">
                                            <h5 class="card-title">Instructions</h5>
                                            <ol>
                                                ${newInstructionsList.join('')}
                                            </ol>
                                        </div>
                                    </div>
                                </div>
                            </div>

                    `;

                    this.displayDiv = newInnerHTML;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
    },

    mounted(){
        this.retriveResult(this.$route.params.id)
        
    }
};
</script>

<style scoped>
.container {
    margin-top: 50px;
}

.button-primary {
    background-color: #4caf50;
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
}

.button-primary:hover {
    background-color: lightblue;
}

.displayMeal {
    margin-top: 30px;
}
</style>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Muli&display=swap");

* {
    box-sizing: border-box;
}

img {
    max-width: 100%;
}

p {
    margin-bottom: 5px;
}

h3 {
    margin: 0;
}

h5 {
    margin: 10px 0;
}

li {
    margin-bottom: 0;
}

.meal {
    margin: 20px 0;
}

.text-center {
    text-align: center;
}

.videoWrapper {
    position: relative;
    padding-bottom: 56.25%;
    padding-top: 25px;
    height: 0;
}

.videoWrapper iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.background{
    background: linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ),url("../assets/recipebackground.jpg");

}

.cardbg{
    background-color: #F3E0DC;
}
</style>




