<template>

    <div class="container">
        <div class="row text-center mb-2 text-lg font-semibold text-gray-900 ">
            <h2>Stuck at Home and Feeling Hungry?</h2>
            <h5>Cook up a random meal by clicking below</h5>
            <button class="button-primary" @click="retriveResult()">
                Meal Roulette 🍔
            </button>
        </div>
        <div v-html="displayDiv" class="displayMeal"></div>
    </div>

</template>

<script>
import axios from "axios";
export default {
    name: "random_food_generator",
    data() {
        return {
            displayDiv: "",
        };
    },
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
                                    
                                    <div class="col-sm-12 col-md-6 col-lg-5">
                                        <img src="${meal.strMealThumb}" class="img-fluid rounded" alt="MealImage">
                                    </div>

                                    <div class="col-sm-12 col-md-3 col-lg-3">
                                        <div class="card-body d-flex align-items-center">
                                            <h5 class="card-title text-center"><mark>${meal.strMeal}</mark></h5>
                                            ${meal.strCategory ? `<p class="card-text"><strong>Category:</strong> ${meal.strCategory}</p>` : ''}
                                            ${meal.strArea ? `<p class="card-text"><strong>Area:</strong> ${meal.strArea}</p>` : ''}
                                            ${meal.strTags ? `<p class="card-text"><strong>Tags:</strong> ${meal.strTags.split(',').join(', ')}</p>` : ''}
                                            <p class="card-text text-decoration-underline"><a class="btn btn-warning btn-md" style="background-image: linear-gradient(to right,red,orange,yellow,green);" href="${meal.strSource}"><medium>More Information About Recipe</medium></a></p>
                                        </div>
                                    </div>

                                    <div class="col-sm-12 col-md-3 col-lg-4">
                                        <div class="card-body d-flex justify-content-left">
                                            <h4><strong><mark>Try this recipe with the following ingredients:</mark></strong></h4>
                                            <ul class="list-group list-group-flush">
                                                ${ingredients.map(ing => `<li class="list-group-item">${ing}</li>`).join('')}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="card mb-3" style="max-width: 100%;">
                                <div class="row g-0">
                                    <div class="col-sm-12 col-md-6 col-lg-4">
                                        <div class="card-body">
                                            <h5 class="card-title d-flex justify-content-center"><mark>Instructions</mark></h5>
                                            <div class="d-flex justify-content-center">
                                                <ol class="space-y-5 max-w-md list-decimal list-inside text-blue-600 dark:text-blue-400">
                                                    ${newInstructionsList.join('')}
                                                </ol>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-sm-12 col-md-6 col-lg-8">
                                        <div class="card-body">
                                            <div class="card-title d-flex justify-content-center"><mark>Video Recipe</mark></div>
                                                <div class="card-body text-secondary">
                                                    ${meal.strYoutube
                                                ? `
                                                    <div class="videoWrapper d-flex justify-content-center">
                                                        <iframe width="853" height="505"
                                                        src="https://www.youtube.com/embed/${meal.strYoutube.slice(
                                                            -11)}">
                                                        </iframe>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>`
                                        : ''}
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
    background-color: lightcoral;
}

.displayMeal {
    /* margin-top: 30px; */

    margin: 20px 0;
}

.text-center {
    text-align: center;
}

</style>

<!-- <style lang="scss" scoped>

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

</style> -->

