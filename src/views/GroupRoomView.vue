<template>
  <div class="section full-height" id="section">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 text-center align-self-center py-5">
          <div class="text-center" id="innerCard">
            <h3 class="mb-0 py-3 text-light"><span>Enter Room </span><span>Create Room</span></h3>
            <input class="checkbox" type="checkbox" id="reg-log" name="reg-log" />
            <label for="reg-log"></label>
            
            <div class="card-3d-wrap mx-auto">
              <div class="card-3d-wrapper">
                <div class="card-front">
                  <div class="center-wrap">
                    <div class="section text-center">
                      <h4 class="mb-4 pb-3">Enter Room</h4>
                      <div class="form-group">
                        <input type="email" name="logemail" class="form-style" placeholder="Room Number" id="logemail"
                          autocomplete="none">
                        <DoorOpen class="input-icon" />
                      </div>
                      <a href="#" class="btn mt-4">submit</a>
                      <!-- <p class="mb-0 mt-4 text-center">
                        <a href="#0" class="link">Don't have room? Create Here</a>
                      </p> -->
                      <p class="mb-0 mt-4 text-center">
                        <RouterLink class="link" to="/swipe">Eating Alone?</RouterLink>
                      </p>
                    </div>
                  </div>
                </div>
                <div class="card-back">
                  <div class="center-wrap">
                    <div class="section text-center">
                      <h4 class="mb-4 pb-3">Create Room</h4>
                      <div class="form-group">
                        <input type="text" name="logname" class="form-style" placeholder="Your Room Name" id="logname"
                          autocomplete="none">
                          <DoorOpen class="input-icon" />
                      </div>
                      <a href="#" class="btn mt-4 mx-2">submit</a>
                      <a @click="randomRoomNameGenerator" class="btn my-4">Generate Random Room</a>
                      <div v-if="roomName">
                        Click here to enter your room:
                        <RouterLink class="link" :to="'/chat/'+roomName+'/swipe'">{{roomName}}</RouterLink>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import DoorOpen from '../components/icons/DoorOpen.vue'
import { RouterLink } from 'vue-router';
export default {
  components: {
    DoorOpen,
    RouterLink,
  },
  data() {
    return {
      roomName: '',
    }
  },
  methods: {
    randomRoomNameGenerator() {
      var randomRoomName = Math.random().toString(36).substring(7);
      this.roomName = randomRoomName;
    }
  },
}
</script>
<style scoped>
a {
  cursor: pointer;
  transition: all 200ms linear;
}

a:hover {
  text-decoration: none;
}

.link {
  color: #FFD1D1;
}

.link:hover {
  color: #FF9494;
}

p {
  font-weight: 500;
  font-size: 14px;
  line-height: 1.7;
}

h4 {
  font-weight: 600;
}

h3 span {
  padding: 0 20px;
  text-transform: uppercase;
  font-weight: 700;
}
@media (max-width: 767px) {
  h3 span {
    font-size: 18px;
  }
}

.section {
  position: relative;
  width: 100%;
  display: block;
}
#section {
  background-image: url(/src/assets/foodbackground.jpg);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

#innerCard {
  max-width: 500px;
  margin: auto;
  border-radius: 10px;
  backdrop-filter: blur(8px);
}

.full-height {
  min-height: calc(100vh - 70px);
}

[type="checkbox"]:checked,
[type="checkbox"]:not(:checked) {
  position: absolute;
  left: -9999px;
}

.checkbox:checked+label,
.checkbox:not(:checked)+label {
  position: relative;
  display: block;
  text-align: center;
  width: 60px;
  height: 16px;
  border-radius: 8px;
  padding: 0;
  margin: 10px auto;
  cursor: pointer;
  background-color: rgb(69, 61, 61);
}

.checkbox:checked+label:before,
.checkbox:not(:checked)+label:before {
  position: absolute;
  display: block;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  color: #12f8ad;
  background-color: #FFD1D1;
  font-family: 'unicons';
  content: url(../assets/arrow-up-left.svg);
  z-index: 20;
  top: -10px;
  left: -10px;
  line-height: 36px;
  text-align: center;
  font-size: 24px;
  transition: all 0.5s ease;
}

.checkbox:checked+label:before {
  transform: translateX(44px) rotate(-270deg);
}

.card-3d-wrap {
  position: relative;
  width: 440px;
  max-width: 100%;
  height: 400px;
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
  perspective: 800px;
  margin-top: 40px;
}

.card-3d-wrapper {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
  transition: all 600ms ease-out;
}

.card-front,
.card-back {
  width: 100%;
  height: 100%;
  background-color: #FFF5E4;
  position: absolute;
  border-radius: 6px;
  left: 0;
  top: 0;
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
  backface-visibility: hidden;
}

.card-back {
  transform: rotateY(180deg);
}

.checkbox:checked~.card-3d-wrap .card-3d-wrapper {
  transform: rotateY(180deg);
}

.center-wrap {
  position: absolute;
  width: 100%;
  padding: 0 35px;
  top: 50%;
  left: 0;
  transform: translate3d(0, -50%, 35px) perspective(100px);
  z-index: 20;
  display: block;
}

.form-group {
  position: relative;
  display: block;
  margin: 0;
  padding: 0;
}

.form-style {
  padding: 13px 20px;
  padding-left: 55px;
  height: 48px;
  width: 100%;
  font-weight: 500;
  border-radius: 4px;
  font-size: 14px;
  line-height: 22px;
  letter-spacing: 0.5px;
  outline: none;
  color: #c4c3ca;
  background-color: #fff;
  border: none;
  transition: all 200ms linear;
  box-shadow: 0 4px 8px 0 rgba(21, 21, 21, .2);
}

.form-style:focus,
.form-style:active {
  border: none;
  outline: none;
  box-shadow: 0 4px 8px 0 rgba(21, 21, 21, .2);
}

.input-icon {
  position: absolute;
  top: 0;
  left: 18px;
  height: 48px;
  font-size: 24px;
  line-height: 48px;
  text-align: left;
  color: #FFD1D1;
  transition: all 200ms linear;
}

.form-group input:-ms-input-placeholder {
  color: #c4c3ca;
  opacity: 0.7;
  transition: all 200ms linear;
}

.form-group input::-moz-placeholder {
  color: #c4c3ca;
  opacity: 0.7;
  transition: all 200ms linear;
}

.form-group input:-moz-placeholder {
  color: #c4c3ca;
  opacity: 0.7;
  transition: all 200ms linear;
}

.form-group input::-webkit-input-placeholder {
  color: #c4c3ca;
  opacity: 0.7;
  transition: all 200ms linear;
}

.form-group input:focus:-ms-input-placeholder {
  opacity: 0;
  transition: all 200ms linear;
}

.form-group input:focus::-moz-placeholder {
  opacity: 0;
  transition: all 200ms linear;
}

.form-group input:focus:-moz-placeholder {
  opacity: 0;
  transition: all 200ms linear;
}

.form-group input:focus::-webkit-input-placeholder {
  opacity: 0;
  transition: all 200ms linear;
}

.btn {
  border-radius: 4px;
  height: 44px;
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  transition: all 200ms linear;
  padding: 0 30px;
  letter-spacing: 1px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  -ms-flex-pack: center;
  text-align: center;
  border: none;
  background-color: #FF9494;
  color: #fff;
  box-shadow: 0 8px 24px 0 rgba(129, 62, 98, 0.2);
}

.btn:active,
.btn:focus {
  background-color: #fff;
  color: #FF9494;
  box-shadow: 0 8px 24px 0 rgba(255, 255, 255, .2);
}

.btn:hover {
  background-color: #fff;
  color: #FF9494;
  box-shadow: 0 8px 24px 0 rgba(255, 255, 255, .2);
}

.logo {
  position: absolute;
  top: 30px;
  right: 30px;
  display: block;
  z-index: 100;
  transition: all 250ms linear;
}

.logo img {
  height: 26px;
  width: auto;
  display: block;
}
</style>