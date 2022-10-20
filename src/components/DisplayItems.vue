<template>
  <div class="card mb-3 mx-4 p-4 border-1"  >
    <div class="row g-0">
      <div class="col-md-6 ">
        <img src="src/assets/macdonald.png" class="foodpic img-fluid rounded-start" alt="...">
      </div>
      <div class="col-md-6 p-4">
        <div class="card-body">
          <h5 class="card-title">Card title</h5>
          <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional
            content. This content is a little bit longer.</p>
          <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
        </div>
      </div>
    </div>
  </div>
  <div class="card mb-3 mx-4 p-4"  >
    <div class="row g-0">
      <div class="col-md-6 ">
        <img src="src/assets/bricklane.png" class="foodpic img-fluid rounded-start" alt="...">
      </div>
      <div class="col-md-6 p-4">
        <div class="card-body">
          <h3 class="card-title">Lorem ipsum dolor, sit amet consectetur adipisicing elit. In ut hic natus numquam dignissimos quae.</h3>
          <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional
            content. This content is a little bit longer.</p>
          <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
.foodpic{
  width:100%;
}

.card{
  border-radius: 20px;
  border-color: rgba(234, 156, 169,0.5) ;
  opacity: 80%;
}

.card:hover{
  border: 8px solid rgba(234, 156, 169,0.5);
  border-radius: 20px;
  opacity: 100%; 
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.6);
}

</style>