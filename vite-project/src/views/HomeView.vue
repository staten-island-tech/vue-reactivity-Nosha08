<script setup>
import CityCard from '../components/CityCard.vue'

const request = require('request');

const name = 'San Francisco'
request.get({
  url: 'https://api.api-ninjas.com/v1/city?name=' + name,
  headers: {
    'X-Api-Key': 'Kx1r7YwFeSKRRUgRBUs4Ng==1l7XCqxVaMONZ1fv'
  },
})
</script>

<template>
  <main>
    <CityCard />
  </main>
</template>
