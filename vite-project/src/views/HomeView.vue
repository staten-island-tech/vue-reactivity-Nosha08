<script setup>
import CityCard from '../components/CityCard.vue'
import { ref } from 'vue'

const location = ref('')
const globalPop = 8091031090
let total = ref(0)
let population = ref(0)

async function fetchData() {
  const key = 'Kx1r7YwFeSKRRUgRBUs4Ng==1l7XCqxVaMONZ1fv'
  console.log('Location:', location.value)

  try {
    const response = await fetch(`https://api.api-ninjas.com/v1/city?name=${location.value}`, {
      headers: {
        'X-Api-Key': key
      }
    });
    location.value = ''

    if (response.ok) {
      const data = await response.json()
      console.log(data[0])

      bubbles.push({
        latitude: data[0].latitude,
        longitude: data[0].longitude,
        radius: data[0].population/1500000,
        fillKey: '#306596'
      })

      const cityPop = data[0].population
      const percentage = cityPop/globalPop * 100
      total.value += percentage
      population.value += cityPop

    } else {
      console.error('Error:', response.status)
      return
    }

  } catch (error) {
    console.error('Request failed:', error)
  }

  create()
}

let bubbles = []
const map = 
new Datamap({
  element: document.getElementById('container'),
  geographyConfig: {
    highlightOnHover: false,
    popupOnHover: false
  }
})


function create() {
  console.log(bubbles)


  setTimeout(() => { 
      map.bubbles(bubbles)
  }, 1000)
}
</script>

<template>
  <main>
    <CityCard />
    <form @submit.prevent="fetchData()">
      <input v-model="location" type="text" id="name" placeholder="Input Location Name"/>
    </form>
    <h1>You have located {{ population.toLocaleString('en-US') }} or a total of {{ total.toFixed(2) }}% of the global population!</h1>
  </main>
</template>

<style scoped>
main {
  text-align: center;
  margin-top: 4rem;
}
</style>