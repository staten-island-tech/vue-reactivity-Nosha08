<script setup>
import CityCard from '@/components/CityCard.vue'
import { bubbles } from './HomeView.vue'
</script>

<template>
  <main>
    <div class="area">
      <CityCard 
          v-for='location in bubbles'
          :key='location.city'
          :population='location.population'
          :percentage='location.percentage'
          :location='location'
        />
    </div>
  </main>
</template>

<style scoped>
.area {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>


