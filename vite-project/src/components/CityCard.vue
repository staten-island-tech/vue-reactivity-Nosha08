<template>
  <div class="city">
    <h1>{{ location.population }}</h1>
  </div>
</template>

<script setup>
const props = defineProps({
  location: Object,
})
</script>

<style scoped>
.city {
  background-color: red;
  width: 250px;
  height: 400px;
}
</style>