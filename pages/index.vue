<script setup lang="ts">

</script>
<template>
  <div class="welcome-page">
    <span class="font-semibold mb-4 welcome-page__title">Where would you like to go?</span>
    <span class="app-color-black font-semibold">Explore your travel opportunities with us!</span>
    <div class="circle rounded-full"></div>
  </div>
</template>
<style scoped lang="scss">
.welcome-page {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  height: 100vh;
  overflow: hidden;
  position: relative;

  &__title {
    background: linear-gradient(45deg, #fb28cd, #7c65d7);
    -webkit-text-fill-color: transparent;
    -webkit-background-clip: text;
    font-size: 2.5rem;
  }
}
.circle {
  width: 450px;
  height: 450px;
  background: linear-gradient(to bottom, #fa39ad 40%, #fe6c4c 50%);
  filter: blur(120px);
  position: absolute;
  bottom: 0;

  @media(max-width: 768px) {
    width: 200px;
    height: 200px;
  }
}
</style>