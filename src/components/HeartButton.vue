<template>
  <div class="icon">
    <svg class="heart-main" viewBox="0 0 512 512" width="100" title="heart">
      <path d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z" />
    </svg>
    <svg class="heart-background" viewBox="0 0 512 512" width="100" title="heart">
      <path d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z" />
    </svg>
  </div>
</template>
<script>
export default {
}
</script>
<style scoped>
*,
*::before,
*::after {
  box-sizing: border-box;
}

.icon {
  fill: transparent;
  stroke: #ff2581;
  stroke-width: 20;
  cursor: pointer;
  position: relative;
}
.icon svg {
  overflow: visible;
}
.icon path {
  stroke-dashoffset: 0;
  stroke-dasharray: 1550;
  transform-origin: center;
}
.icon .heart-background {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 9px;
  z-index: -1;
  stroke: none;
}
.icon .heart-main:hover path {
  animation: stroke-animation 2s ease-in-out forwards;
}
.icon .heart-main:hover ~ .heart-background path {
  animation: fade-animation 2s ease-in-out forwards;
}

@keyframes stroke-animation {
  0% {
    stroke-dashoffset: 0;
  }
  30% {
    stroke-dashoffset: 1550;
  }
  60% {
    stroke-dashoffset: 3100;
    fill: transparent;
    transform: scale(1);
  }
  80% {
    fill: #ff2581;
    transform: scale(1.1);
  }
  90% {
    transform: scale(1);
  }
  100% {
    stroke-dashoffset: 3100;
    fill: #ff2581;
  }
}
@keyframes fade-animation {
  70% {
    fill: transparent;
    transform: scale(1);
  }
  80% {
    fill: #ff7eb4;
    transform: scale(1.1);
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: scale(2.5);
    opacity: 0;
  }
}
</style>