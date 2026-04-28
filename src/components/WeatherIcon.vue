<script setup lang="ts">
import type { WeatherConditionType } from '../types/weather'

const props = defineProps<
  {
   condition: WeatherConditionType; 
   size?: number 
  }
    >();
const sz = props.size ?? 80;
</script>

<template>
  <!-- Clear / Sunny -->
  <svg v-if="condition === 'Clear'" :width="sz" :height="sz" viewBox="0 0 66 63" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="33" cy="31" r="21" fill="#FFD166" stroke="#E8A010" stroke-width="1.5"/>
    <circle cx="33" cy="31" r="16" fill="#FFC430"/>
    <path d="M33 5v-4M33 61v-4M5 31H1M65 31h-4M13.6 11.6l-2.8-2.8M55.2 53.2l-2.8-2.8M10.8 53.2l-2.8 2.8M52.4 9.2l-2.8 2.8" stroke="#E8A010" stroke-width="2" stroke-linecap="round"/>
    <path d="M20 30c0-7.18 5.82-13 13-13" stroke="#E8A010" stroke-width="1.5" stroke-linecap="round"/>
  </svg>

  <!-- Clouds -->
  <svg v-else-if="condition === 'Clouds'" :width="sz" :height="sz" viewBox="0 0 64 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="46" cy="18" r="11" fill="#FFD166" stroke="#ccc" stroke-width="1.5"/>
    <path d="M32 14c-9.389 0-17 7.611-17 17 0 .698.055 1.382.136 2.057C14.761 33.025 14.384 33 14 33 6.82 33 1 38.82 1 46s5.82 13 13 13c6.763 0 24.682 0 32 0 9.389 0 17-7.611 17-17 0-5.192-2.329-9.838-5.999-12.954" fill="#B8D8EC" stroke="#7AAEC8" stroke-width="1.5" stroke-linejoin="round"/>
    <path d="M21 30c0-5.523 4.477-10 10-10" stroke="#7AAEC8" stroke-width="1.5" stroke-linecap="round"/>
  </svg>

  <!-- Rain -->
  <svg v-else-if="condition === 'Rain'" :width="sz" :height="sz" viewBox="0 0 64 59" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M47.93 12.12C56.41 13.08 63 20.27 63 29c0 9.39-7.61 17-17 17H14C6.82 46 1 40.18 1 33s5.82-13 13-13c.38 0 .76.02 1.14.06C15.05 19.38 15 18.7 15 18c0-9.39 7.61-17 17-17 7.32 0 13.54 4.63 15.93 11.12z" fill="#5B9FD8" stroke="#2E6FA8" stroke-width="1.5"/>
    <path d="M30 49c9 0 0-11 0-11S21 49 30 49z" fill="#A8D4F0" stroke="#2E6FA8" stroke-width="1.5"/>
    <path d="M20 58c9 0 0-11 0-11S11 58 20 58z" fill="#A8D4F0" stroke="#2E6FA8" stroke-width="1.5"/>
    <path d="M40 58c9 0 0-11 0-11S31 58 40 58z" fill="#A8D4F0" stroke="#2E6FA8" stroke-width="1.5"/>
  </svg>

  <!-- Drizzle -->
  <svg v-else-if="condition === 'Drizzle'" :width="sz" :height="sz" viewBox="0 0 64 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M47.93 12.12C56.41 13.08 63 20.27 63 29c0 9.39-7.61 17-17 17H14C6.82 46 1 40.18 1 33s5.82-13 13-13c.38 0 .76.02 1.14.06C15.05 19.38 15 18.7 15 18c0-9.39 7.61-17 17-17 7.32 0 13.54 4.63 15.93 11.12z" fill="#6DB5D8" stroke="#3E88B5" stroke-width="1.5"/>
    <line x1="29" y1="46" x2="29" y2="50" stroke="#2E6FA8" stroke-width="2" stroke-linecap="round"/>
    <line x1="39" y1="46" x2="39" y2="50" stroke="#2E6FA8" stroke-width="2" stroke-linecap="round"/>
    <line x1="19" y1="46" x2="19" y2="50" stroke="#2E6FA8" stroke-width="2" stroke-linecap="round"/>
    <line x1="29" y1="55" x2="29" y2="59" stroke="#2E6FA8" stroke-width="2" stroke-linecap="round"/>
    <line x1="39" y1="55" x2="39" y2="59" stroke="#2E6FA8" stroke-width="2" stroke-linecap="round"/>
    <line x1="19" y1="55" x2="19" y2="59" stroke="#2E6FA8" stroke-width="2" stroke-linecap="round"/>
  </svg>

  <!-- Thunderstorm -->
  <svg v-else-if="condition === 'Thunderstorm'" :width="sz" :height="sz" viewBox="0 0 64 62" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M47.93 12.12C56.41 13.08 63 20.27 63 29c0 9.39-7.61 17-17 17H14C6.82 46 1 40.18 1 33s5.82-13 13-13c.38 0 .76.02 1.14.06C15.05 19.38 15 18.7 15 18c0-9.39 7.61-17 17-17 7.32 0 13.54 4.63 15.93 11.12z" fill="#6A718E" stroke="#3A4060" stroke-width="1.5"/>
    <polyline points="30,46 26,53 32,53 28,61" stroke="#FFD166" stroke-width="2.5" stroke-linejoin="round" fill="none"/>
    <line x1="42" y1="46" x2="42" y2="50" stroke="#5B9FD8" stroke-width="2" stroke-linecap="round"/>
    <line x1="18" y1="46" x2="18" y2="50" stroke="#5B9FD8" stroke-width="2" stroke-linecap="round"/>
    <line x1="42" y1="54" x2="42" y2="58" stroke="#5B9FD8" stroke-width="2" stroke-linecap="round"/>
    <line x1="18" y1="54" x2="18" y2="58" stroke="#5B9FD8" stroke-width="2" stroke-linecap="round"/>
  </svg>

  <!-- Snow -->
  <svg v-else-if="condition === 'Snow'" :width="sz" :height="sz" viewBox="0 0 64 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M47.93 12.12C56.41 13.08 63 20.27 63 29c0 9.39-7.61 17-17 17H14C6.82 46 1 40.18 1 33s5.82-13 13-13c.38 0 .76.02 1.14.06C15.05 19.38 15 18.7 15 18c0-9.39 7.61-17 17-17 7.32 0 13.54 4.63 15.93 11.12z" fill="#C8E0F0" stroke="#8AB0C8" stroke-width="1.5"/>
    <g stroke="#5A90B8" stroke-width="2" stroke-linecap="round">
      <line x1="32" y1="49" x2="32" y2="57"/>
      <line x1="28" y1="51" x2="36" y2="55"/><line x1="36" y1="51" x2="28" y2="55"/>
      <line x1="20" y1="49" x2="20" y2="57"/>
      <line x1="16" y1="51" x2="24" y2="55"/><line x1="24" y1="51" x2="16" y2="55"/>
      <line x1="44" y1="49" x2="44" y2="57"/>
      <line x1="40" y1="51" x2="48" y2="55"/><line x1="48" y1="51" x2="40" y2="55"/>
    </g>
  </svg>

  <!-- Mist / Fog / Haze fallback -->
  <svg v-else :width="sz" :height="sz" viewBox="0 0 64 44" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M47.93 2.12C56.41 3.08 63 10.27 63 19c0 9.39-7.61 17-17 17H14C6.82 36 1 30.18 1 23s5.82-13 13-13c.38 0 .76.02 1.14.06C15.05 9.38 15 8.7 15 8c0-9.39 7.61-17 17-17 7.32 0 13.54 4.63 15.93 11.12z" fill="#B0C8D4" stroke="#7A98A8" stroke-width="1.5"/>
    <line x1="8" y1="38" x2="56" y2="38" stroke="#7A98A8" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="14" y1="43" x2="50" y2="43" stroke="#9AB4C0" stroke-width="2" stroke-linecap="round"/>
  </svg>
</template>
