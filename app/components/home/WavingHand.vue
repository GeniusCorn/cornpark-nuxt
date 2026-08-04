<template>
  <span
    aria-label="waving hand"
    class="wave-hand inline-block"
    role="img"
  >👋</span>
</template>

<style scoped>
.wave-hand {
  transform-origin: 70% 70%;
  animation: wave 2.5s ease-in-out infinite;
}

@keyframes wave {
  0%,
  60%,
  100% {
    transform: rotate(0deg);
  }
  10% {
    transform: rotate(14deg);
  }
  20% {
    transform: rotate(-8deg);
  }
  30% {
    transform: rotate(14deg);
  }
  40% {
    transform: rotate(-4deg);
  }
  50% {
    transform: rotate(10deg);
  }
}
</style>
