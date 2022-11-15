<template>
  <head>
    <title>Recipe Search</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
      integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"
      integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous" />
    <link href="https://fonts.googleapis.com/css2?family=Mali:ital,wght@1,700&display=swap" rel="stylesheet">
  </head>

  <!-- Jumbotron -->
  <div class="jumbotron jumbotron-fluid vertical-center text-center">
    <div class="container">
      <h1 class="display-4" style="color:white;">Wad To Eat At Home?</h1>
      <!-- <hr class="my-4"> -->
      <p>Search for recipes to cook at home</p>
      <!-- Form for search field and button -->
      <form class="form-check form-check-inline">
        <input class="form-control mr-sm-2" v-model="search" type="search" placeholder="Search for Food"
          aria-label="Search" id="search-input">
        <button @click="fetchData(search)" class="btn my-2 my-sm-0" type="button" id="search-button"
          style="text-transform: capitalize;">Show me recipes <i class="fas fa-search"></i></button>
      </form>
      <MealCard :meals="meals"></MealCard>
    </div>
  </div>
</template>
        
<script>
import axios from "axios"
import MealCard from "../components/MealCard.vue"

export default {
  components: { MealCard },
  data() {
    return {
      search: "",
      meals: []
    };
  },
  methods: {
    fetchData(search) {
      if (search == '') {
        alert('Search field cannot be empty!')
      } else {
        axios.get(`https://api.spoonacular.com/recipes/search?apiKey=${import.meta.env.VITE_SPOONACULAR_API_KEY}&query=${search}`)
          .then(res => {
            this.meals = res.data.results;
          }).catch(err => console.log(err));
      }
    }
  },
}
</script>


<style scoped>
body {
  background-color: #D4A59A;
  height: 100%;
  text-align: center;
}

h1 {
  font-family: 'Mali', cursive;
  font-style: italic;
  margin-bottom: 0px;
}

/* Jumbotron */
.jumbotron {
  background-color: #5C2018;
  color: white;
  padding: 30px 20px 40px 20px;
  margin-bottom: 20px;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("../assets/recipebackground.jpg");
  background-size: cover;
  /* background-position: center center; */
  min-height: 100vh;
}

.vertical-center {
  display: flex;
  align-items: center;

}

#search-input,
#search-button {
  margin: 10px 0px 10px 0px;

}

/* Style for random cards */
.card {
  background-color: #F3E0DC;
  display: inline-block;
  margin: 0px 10px 10px 10px;
}

.cropped {
  width: 400px;
  height: 230px;
  object-fit: cover;
  overflow: hidden;
}

.cropped img {
  margin: 10px 0px 0px 0px;
  width: 90%;
}

/* Search bar */
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

/* search button */
#search-button {
  background-color: #5C2018;
  color: white;
  border-color: white;
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
  border-top-right-radius: 30px;
  border-bottom-right-radius: 30px;

}

#search-button:hover {
  color: black;
  border-color: black;
}

#search-button:active {
  background-color: #5C2018;
}

@media (min-width: 576px) {

  .mr-sm-2,
  .mx-sm-2 {
    margin-right: 0px !important;
  }
}

@media (max-width: 420px) {
  .card {
    width: 90% !important;
  }

  .cropped {
    width: 100%;
    height: 100%;
    object-fit: cover;
    overflow: hidden;
  }

  .cropped img {
    margin: 10px 0px 0px 0px;
    width: 90%;
  }
}

/* Custom styling of radio button */
.custom-control-input:checked~.custom-control-label::before {
  color: #fff;
  border-color: #5C2018;
  background-color: #5C2018;
}

/* Custom styling of randomizer buttons */
.btn-primary {
  background-color: #5C2018;
  border-color: #5C2018;
}

.btn-primary:hover {
  background-color: #D4A59A;
  border-color: #D4A59A;
}



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
