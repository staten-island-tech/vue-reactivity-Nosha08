<script setup>
import CityCard from '../components/CityCard.vue'
import { ref } from 'vue'

const location = ref('')
const globalPop = 8091031090
let total = 0

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
      const cityPop = data[0].population
      const percentage = cityPop/globalPop * 100
      total += percentage
      console.log(total + '%')
    } else {
      console.error('Error:', response.status)
      return
    }

  } catch (error) {
    console.error('Request failed:', error)
  }

}

</script>

<template>
  <main>
    <CityCard />
    <form @submit.prevent="fetchData()">
      <input v-model="location" type="text" id="name" placeholder="Input Location Name"/>
    </form>
  </main>
</template>
