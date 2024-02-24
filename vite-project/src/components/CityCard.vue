<template>
  <div class="city">
    <h1>{{ location.city }}</h1>
    <h2>{{ location.population.toLocaleString('en-US') }}</h2>
    <h2>{{ location.percentage.toFixed(3) + ('%') }}</h2>
  </div>
</template>

<script setup>
const props = defineProps({
  location: Object,
})
</script>

<style scoped>

.city {
  background-color: #2397cc;
  border: 2px solid #1547d1;
  width: 250px;
  height: 300px;
  border-radius: 10px;
  margin: 10px;
  padding: 15px;
}
</style>