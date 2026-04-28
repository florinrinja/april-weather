<script setup lang="ts">
import { computed } from "vue";
import type { WeatherEntry, City } from "../types/weather";
import WeatherIcon from "./WeatherIcon.vue";
import {
  degreesToCompass,
  msToKmh,
  formatFullDate,
  getConditionEmoji,
} from "../utils/weatherUtils";
import type { WeatherConditionType } from "../types/weather";

const props = defineProps<{
  entry: WeatherEntry;
  city: City;
}>();

const condition = computed(() => props.entry.weather[0].main as WeatherConditionType);
const description = computed(() => props.entry.weather[0].description);
const temp = computed(() => Math.round(props.entry.main.temp));
const feelsLike = computed(() => Math.round(props.entry.main.feels_like));
const humidity = computed(() => Math.round(props.entry.main.humidity));
const wind = computed(() => msToKmh(props.entry.wind.speed));
const windDir = computed(() => degreesToCompass(props.entry.wind.deg));
const today = computed(() => formatFullDate(new Date()));
</script>

<template>
  <div class="current-weather">
    <div class="cw-left">
      <WeatherIcon :condition="condition" :size="110" />
      <div class="cw-condition">
        <span class="cw-emoji">{{ getConditionEmoji(condition) }}</span>
        <span class="cw-desc">{{ description }}</span>
      </div>
    </div>

    <div class="cw-right">
      <div class="cw-location">
        <span class="cw-city">{{ city.name }}</span>
        <span class="cw-country">{{ city.country }}</span>
      </div>

      <div class="cw-temp-row">
        <span class="cw-temp">{{ temp }}</span>
        <span class="cw-unit">°C</span>
      </div>

      <div class="cw-date">{{ today }}</div>

      <div class="cw-stats">
        <div class="cw-stat">
          <span class="cw-stat-label">Feels like</span>
          <span class="cw-stat-value">{{ feelsLike }}°C</span>
        </div>
        <div class="cw-stat">
          <span class="cw-stat-label">Humidity</span>
          <span class="cw-stat-value">{{ humidity }}%</span>
        </div>
        <div class="cw-stat">
          <span class="cw-stat-label">Wind</span>
          <span class="cw-stat-value"
            >{{ wind }} km/h <em>{{ windDir }}</em></span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.current-weather {
  display: flex;
  gap: 2rem;
  align-items: center;
  width: 100%;
  padding: 1rem 0;
}

.cw-left {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
}

.cw-condition {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.75);
  text-transform: capitalize;
  letter-spacing: 0.03em;
}

.cw-emoji {
  font-size: 1rem;
}

.cw-right {
  flex: 1;
  min-width: 0;
}

.cw-location {
  display: flex;
  align-items: baseline;
  gap: 0.4rem;
  margin-bottom: 0.25rem;
}

.cw-city {
  font-family: "DM Serif Display", serif;
  font-size: 1.6rem;
  color: #fff;
  line-height: 1;
}

.cw-country {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.6);
  font-weight: 300;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.cw-temp-row {
  display: flex;
  align-items: flex-start;
  line-height: 1;
  margin: 0.2rem 0;
}

.cw-temp {
  font-family: "DM Serif Display", serif;
  font-size: 4.5rem;
  color: #fff;
  letter-spacing: -2px;
}

.cw-unit {
  font-size: 1.8rem;
  color: rgba(255, 255, 255, 0.7);
  margin-top: 0.5rem;
  margin-left: 0.1rem;
}

.cw-date {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.55);
  letter-spacing: 0.05em;
  text-transform: uppercase;
  margin-bottom: 1rem;
  font-weight: 300;
}

.cw-stats {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.cw-stat {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.82rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 0.3rem;
}

.cw-stat:last-child {
  border-bottom: none;
}

.cw-stat-label {
  color: rgba(255, 255, 255, 0.55);
  font-weight: 300;
  letter-spacing: 0.05em;
}

.cw-stat-value {
  color: #fff;
  font-weight: 500;
}

.cw-stat-value em {
  font-style: normal;
  color: rgba(255, 255, 255, 0.65);
  font-size: 0.75em;
}

@media (max-width: 500px) {
  .current-weather {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  .cw-temp {
    font-size: 3.5rem;
  }
  .cw-city {
    font-size: 1.3rem;
  }
}
</style>
