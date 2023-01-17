<template>
  <div class="main">
    <div class="container">
      <h1>Hello, John Doe!</h1>
      <div class="main__image"></div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="scss">
  .main {
    margin-top: 160px;

    &__image {
      width: 100%;
			height: 531px;
			background-image: url('@/assets/images/screen.svg');
			background-position: center;
			background-repeat: no-repeat;
    }
  }
</style>
