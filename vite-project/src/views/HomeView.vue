<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import CityCard from '@/components/CityCard.vue'

let Datamap

const location = ref('')
const globalPop = 8091031090
let total = ref(parseFloat(localStorage.getItem('total')) || 0)
let population = ref(parseFloat(localStorage.getItem('population')) || 0)

async function fetchData() {
  const key = 'Kx1r7YwFeSKRRUgRBUs4Ng==1l7XCqxVaMONZ1fv'
  console.log('Location:', location.value)

  if (bubbles.some(bubble => bubble.city === location.value)) {
    alert('Location already entered')
  } else {
      try {
        const response = await fetch(`https://api.api-ninjas.com/v1/city?name=${location.value}`, {
          headers: {
            'X-Api-Key': key
          }
        })
        location.value = ''

        if (response.ok) {
          const data = await response.json()
          console.log(data)

          const cityPop = data[0].population
          const percentage = cityPop/globalPop * 100
          total.value += percentage
          population.value += cityPop

          bubbles.push({
            latitude: data[0].latitude,
            longitude: data[0].longitude,
            radius: Math.sqrt(data[0].population)/750,
            fillKey: 'bubble',
            city: data[0].name,
            population: data[0].population,
            percentage: percentage,
          })

          localStorage.setItem('total', total.value)
          localStorage.setItem('population', population.value)

        } else {
          console.error('Error:', response.status)
          return
        }

      } catch (error) {
        console.error('Request failed:', error)
        alert('Invalid location name')
      }

      create()
      
      }
}

window.onbeforeunload = () => {
  localStorage.removeItem('total')
  localStorage.removeItem('population')
}

onMounted(async () => {
  const module = await import('datamaps')
  Datamap = module.default
})
</script>

<script>
let bubbles = []

const map = 
new Datamap({
  element: document.getElementById('container'),
  geographyConfig: {
    highlightOnHover: false,
    popupOnHover: false
  },
  fills: {
    'defaultFill': '#ADDFFF',
    'bubble': '#FA8072'
  }
})

const zoom = d3.behavior.zoom()
  .scaleExtent([1, 100])
  .on('zoom', function() {
    map.svg.selectAll('g').attr('transform', 'translate(' + d3.event.translate + ')scale(' + d3.event.scale + ')')
  })

map.svg.call(zoom)


function create() {
  console.log(bubbles)
    setTimeout(() => { 
      map.bubbles(bubbles, {
        popupTemplate: function(geo, data) {
            return '<div class="hover">' +
                   'City: ' + data.city +
                   '<br/>Population: ' + data.population.toLocaleString('en-US') +
                   '<br/>Percentage: ' + data.percentage.toFixed(3) + ('%') +
                   '</div>'
        }})
  }, 1000)
}
export {bubbles}
</script>


<template>
  <main>
    <form @submit.prevent="fetchData()">
      <input v-model="location" type="text" id="name" placeholder="Input Location Name"/>
    </form>
    <h1>You have located {{ population.toLocaleString('en-US') }} or a total of {{ total.toFixed(3) }}% of the global population!</h1>
  </main>
</template>

<style>
main {
  text-align: center;
  margin-top: 4rem;
}

.datamaps-hoverover {
  margin-top: 10rem;
  right: 100px;
}
</style>
