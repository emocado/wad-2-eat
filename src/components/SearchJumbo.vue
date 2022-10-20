<template>
    <div class="jumbotron align-center mx-4 pt-2 p-4">
        <div class="row mx-5 mt-5">
            <!-- <div class="col-10">
                <input class="input form-control w-50" type="text" name="search"
                    placeholder="search for areas, food type">
                <button class="btn btn-primary btn-sm">Search</button>
            </div> -->
            <div class="search-bar input-group">
                <input type="text" class="input-search form-control" placeholder="Search for areas, food type"
                    aria-label="Recipient's username" aria-describedby="button-addon2">
                <button class="btn btn-outline-secondary search" type="button" id="button-addon2"><img id="search-icon" src="src/assets/findFood.png"></button>
            </div>
            <div class="col-2">

            </div>
        </div>
        <div class="row mx-5 mt-3">
            <button class="sort btn btn-primary btn-sm" href="#" role="button">Learn more</button>
            <button class="sort btn btn-primary btn-sm" href="#" role="button">Learn more</button>
            <button class="sort btn btn-primary btn-sm" href="#" role="button">Learn more</button>
        </div>
    </div>
</template>

<script>

</script>

<style scoped>
#search-icon{
    height: 100%;
}
.sort {
    margin-left: 10px;
    margin-right: 10px;
    width: 100px;
}
.input-search:focus{
    box-shadow: 0 10px 20px rgba(245, 164, 164, 0.6);
    border-color: rgb(234, 156, 169) ;
}
.search{
    height:50px;
    border:none;
    background:  rgb(234, 156, 169);
}

.jumbotron {
    /* background-color: rgb(243, 201, 125); */
    background-color: none;
    border-radius: 20px;
}

input::placeholder {
    font-style: italic;
    opacity: .5;
    color: rgb(234, 156, 169);
}
</style>