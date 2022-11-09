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
      
        <div id="meals">
            <input type="text" v-model="search" class="search">
            <button @click="fetchData(search)">search</button>
        
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
                fetchData(search) {
                    axios.get(`https://api.spoonacular.com/recipes/search?apiKey=52e7e5abc8da43e3b0722667e3cec54d&query=`+search)
                        .then(res => {
                        this.meals = res.data.results;
                        console.log(res.data.results)
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
        </style>
        
         