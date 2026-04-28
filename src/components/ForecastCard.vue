<script setup lang="ts">
import type { DailyForecast } from "../types/weather";
import WeatherIcon from "./WeatherIcon.vue";
import { msToKmh, degreesToCompass } from "../utils/weatherUtils";

import humidityIcon from '../assets/icons/humidity.svg?raw';
import windIcon from '../assets/icons/wind.svg?raw';

defineProps<{ forecast: DailyForecast }>();
</script>

<template>
  <div class="forecast-card">
    <span class="fc-day">{{ forecast.dayName.slice(0, 3) }}</span>
    <WeatherIcon :type="forecast.condition" size="sm" />
    <span class="fc-temp">{{ Math.round(forecast.tempAvg) }}°</span>
    <div class="fc-details">
      <span class="fc-detail">
        <span class="fc-icon" v-html="humidityIcon" aria-hidden="true" />
        {{ forecast.humidity }}%
      </span>
      <span class="fc-detail">
        <span class="fc-icon" v-html="windIcon" aria-hidden="true" />
        {{ msToKmh(forecast.windSpeed) }}
        <em> {{ degreesToCompass(forecast.windDir) }}</em>
      </span>
    </div>
  </div>
</template>

<style scoped>
.forecast-card {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  gap: 0.4rem;
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 16px;
  padding: 1rem 0.75rem;
  backdrop-filter: blur(8px);
  flex: 1;
  min-width: 0;
  transition: background 0.2s;
}

.forecast-card:hover {
  background: rgba(255, 255, 255, 0.2);
}

.fc-day {
  font-size: 0.72rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.65);
}

.fc-temp {
  font-family: "DM Serif Display", serif;
  font-size: 1.4rem;
  color: #fff;
}

.fc-details {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.15rem;
}

.fc-detail {
  font-size: 0.68rem;
  color: rgba(255, 255, 255, 0.6);
  display: flex;
  align-items: center;
}

.fc-detail em {
  font-style: normal;
  color: rgba(255, 255, 255, 0.4);
}

.fc-icon {
  margin-right: 0.25rem;
}
</style>
