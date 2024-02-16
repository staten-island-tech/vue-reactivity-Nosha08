<script setup>
import CityCard from '@/components/CityCard.vue'
import { bubbles } from './HomeView.vue'

</script>

<template>
  <main>
  <CityCard 
      v-for='location in bubbles'
      :key='location.population'
      :location='location'
    />
  </main>
</template>

<style scoped>

</style>


