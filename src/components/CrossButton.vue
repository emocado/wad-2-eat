<template>
  <div>
  <a href="#">
    <span class="left">
      <span class="circle-left"></span>
      <span class="circle-right"></span>
    </span>
    <span class="right">
      <span class="circle-left"></span>
      <span class="circle-right"></span>
    </span>
  </a>
</div>
</template>
<script>
export default {
  name: 'CrossButton',
  methods: {
    clickHandler() {
      console.log('clicked');
      this.$emit('click');
    },
  },
}
</script>
<style scoped>

div a {
  width: 100px;
  height: 100px;
  position: absolute;
  background-color: #ffffff;
  border-radius: 50px;
  opacity: 1;
  transition: all 0.4s cubic-bezier(0.215, 0.61, 0.355, 1);
  -webkit-box-shadow: 0px 0px 30px 0px rgba(247, 149, 29, 0.5);
  -moz-box-shadow: 0px 0px 30px 0px rgba(247, 149, 29, 0.5);
  box-shadow: 0px 0px 30px 0px rgba(247, 149, 29, 0.5);
}
div a > span {
  background-color: #f5a700;
  display: block;
  height: 12px;
  border-radius: 6px;
  position: relative;
  transition: all 0.4s cubic-bezier(0.215, 0.61, 0.355, 1);
  position: absolute;
  top: 50%;
  margin-top: -6px;
  left: 18px;
  width: 64px;
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-justify-content: space-between;
  justify-content: space-between;
  -moz-justify-content: space-between;
  -ms-justify-content: space-between;
}
div a > span span {
  display: block;
  background-color: #ed7f00;
  width: 12px;
  height: 12px;
  border-radius: 6px;
  transition: all 0.4s cubic-bezier(0.215, 0.61, 0.355, 1);
  position: absolute;
  left: 0;
  top: 0;
}
div a > span.left {
  transform: rotate(45deg);
  transform-origin: center;
}
div a > span.left .circle-left {
  transition: all 0.4s cubic-bezier(0.215, 0.61, 0.355, 1);
  margin-left: 0;
}
div a > span.left .circle-right {
  transition: all 0.4s cubic-bezier(0.215, 0.61, 0.355, 1);
  margin-left: 52px;
}
div a > span.right {
  transform: rotate(-45deg);
  transform-origin: center;
}
div a > span.right .circle-left {
  transition: all 0.4s cubic-bezier(0.215, 0.61, 0.355, 1);
  margin-left: 0;
}
div a > span.right .circle-right {
  transition: all 0.4s cubic-bezier(0.215, 0.61, 0.355, 1);
  margin-left: 52px;
}
div a:hover > span {
  background-color: #2faee0;
  transition: all 0.4s cubic-bezier(0.215, 0.61, 0.355, 1);
}
div a:hover > span span {
  transition: all 0.4s cubic-bezier(0.215, 0.61, 0.355, 1);
  background-color: #008ac9;
}
div a:hover > span.left .circle-left {
  transition: all 0.4s cubic-bezier(0.215, 0.61, 0.355, 1);
  margin-left: 52px;
}
div a:hover > span.left .circle-right {
  transition: all 0.4s cubic-bezier(0.215, 0.61, 0.355, 1);
  margin-left: 0;
}
div a:hover > span.right .circle-left {
  transition: all 0.4s cubic-bezier(0.215, 0.61, 0.355, 1);
  margin-left: 52px;
}
div a:hover > span.right .circle-right {
  transition: all 0.4s cubic-bezier(0.215, 0.61, 0.355, 1);
  margin-left: 0;
}



</style>