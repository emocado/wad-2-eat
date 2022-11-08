<template>

    <div class="container">
        <div class="row text-center">
            <h3>Stuck at Home and Feeling Hungry?</h3>
            <h5>Cook up a random meal by clicking below</h5>
            <button class="button-primary" @click="retriveResult()">
                Get Meal 🍔
            </button>
        </div>
        <div id="displayDiv" class="displayMeal"></div>
    </div>

</template>

<script>
import axios from "axios";
export default {
    name: "random_food_generator",
    // data() {
    //     return {

    //     };
    // },
    methods: {
        retriveResult() {
            axios
                .get("https://www.themealdb.com/api/json/v1/1/random.php")
                .then((response) => {
                    const meal = response.data.meals[0];
                    console.log(meal);

                    const ingredients = [];
                    // Get all ingredients from the object. Up to 20
                    for (let i = 1; i <= 20; i++) {
                        if (meal[`strIngredient${i}`]) {
                            ingredients.push(
                                `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
                            );
                        } else {
                            // Stop if no more ingredients
                            break;
                        }
                    }

                    // Build output
                    // splice the ${meal.strIntructions} in list format and display inside the card div as steps to cook

                    const newInstructions = meal.strInstructions.split(". ");
                    const newInstructionsList = newInstructions.map((instruction) => {
                        return `<li>${instruction}</li>`;
                    });
                    // console.log(newInstructionsList);

                    const newInnerHTML = `
                            <div class="card mt-3 mb-3" style="max-width: 100%;">
                                <div class="row g-0">
                                    <div class="col-md-8">
                                        <img src="${meal.strMealThumb}" class="img-fluid rounded-start" alt="MealImage">
                                    </div>
                                    <div class="col-md-4">
                                        <div class="card-body">
                                            <h5 class="card-title">${meal.strMeal}</h5>
                                            ${meal.strCategory ? `<p class="card-text"><strong>Category:</strong> ${meal.strCategory}</p>` : ''}
                                            ${meal.strArea ? `<p class="card-text"><strong>Area:</strong> ${meal.strArea}</p>` : ''}
                                            ${meal.strTags ? `<p class="card-text"><strong>Tags:</strong> ${meal.strTags.split(',').join(', ')}</p>` : ''}
                                            <h5>Ingredients:</h5>
                                            <ul>
                                                ${ingredients.map(ing => `<li>${ing}</li>`).join('')}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="card mb-3" style="max-width: 100%;">
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

                            ${meal.strYoutube
                                ? `
                            <div class="modal-dialog modal-xl">
                                <h5>Video Recipe</h5>
                                <div class="videoWrapper">
                                <iframe width="420" height="315"
                                src="https://www.youtube.com/embed/${meal.strYoutube.slice(
                                    -11
                                )}">
                                </iframe>
                                </div>
                            </div>`
                                : ""
                            }
                    `;

                    document.getElementById("displayDiv").innerHTML = newInnerHTML;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
    },
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
    margin-top: 50px;
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
</style>


