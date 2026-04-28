<script setup lang="ts">
/**
 * CurrentWeather.vue — Hero weather block
 *
 * Displays the full current conditions for a resolved location:
 * icon, condition label, city, temperature, and a stat row
 * (feels-like, humidity, wind speed + compass direction).
 */
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
  entry: WeatherEntry; // Full OWM current-weather response object
  city: City;         // Resolved city name + country code
}>();

// Derived display values — all computed so they re-evaluate
// automatically if the parent ever swaps the entry prop.

/** Main condition key (e.g. "Clear", "Rain") used to pick icon + emoji. */
const condition = computed(() => props.entry?.weather?.[0]?.main as WeatherConditionType);

/** Human-readable description (e.g. "light rain"). Capitalised via CSS. */
const description = computed(() => props.entry.weather[0].description);

const temp      = computed(() => Math.round(props.entry.main.temp));
const feelsLike = computed(() => Math.round(props.entry.main.feels_like));
const humidity  = computed(() => Math.round(props.entry.main.humidity));

/** Wind speed converted from m/s (OWM default) to km/h for display. */
const wind    = computed(() => msToKmh(props.entry.wind.speed));

/** Wind degrees converted to a compass label (e.g. 270° → "W"). */
const windDir = computed(() => degreesToCompass(props.entry.wind.deg));

/** Formatted date string shown below the temperature (e.g. "Monday, 28 April 2026"). */
const today   = computed(() => formatFullDate(new Date()));
</script>

<template>
  <div class="current-weather">

    <!-- Left column: icon + condition badge -->
    <div class="cw-left">
      <!-- Large icon; size="lg" maps to max-width: 6rem in WeatherIcon -->
      <WeatherIcon :type="condition" size="lg" />

      <!-- Emoji + text description beneath the icon -->
      <div class="cw-condition">
        <span class="cw-emoji">{{ getConditionEmoji(condition) }}</span>
        <span class="cw-desc">{{ description }}</span>
      </div>
    </div>

    <!-- Right column: location, temperature, date, stats -->
    <div class="cw-right">

      <!-- City name + country code on the same baseline -->
      <div class="cw-location">
        <span class="cw-city">{{ city.name }}</span>
        <span class="cw-country">{{ city.country }}</span>
      </div>

      <!-- Large temperature display; unit sits top-right of the number -->
      <div class="cw-temp-row">
        <span class="cw-temp">{{ temp }}</span>
        <span class="cw-unit">°C</span>
      </div>

      <div class="cw-date">{{ today }}</div>

      <!-- Secondary stat rows: feels-like / humidity / wind -->
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
          <!-- Compass direction is de-emphasised with <em> styling -->
          <span class="cw-stat-value">{{ wind }} km/h <em>{{ windDir }}</em></span>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
/* ─── Outer layout ────────────────────────────────────────────────────────── */
.current-weather {
  display: flex;
  gap: 2rem;
  align-items: center;
  width: 100%;
  padding: 1rem 0;
}

/* ─── Left column ─────────────────────────────────────────────────────────── */
.cw-left {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0; /* Never squish the icon on narrow cards */
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

/* ─── Right column ────────────────────────────────────────────────────────── */
.cw-right {
  flex: 1;
  min-width: 0; /* Allow long city names to truncate rather than overflow */
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

/* ─── Temperature ─────────────────────────────────────────────────────────── */
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

/* Unit is smaller and offset so it reads as a superscript-style label */
.cw-unit {
  font-size: 1.8rem;
  color: rgba(255, 255, 255, 0.7);
  margin-top: 0.5rem;
  margin-left: 0.1rem;
}

/* ─── Date ────────────────────────────────────────────────────────────────── */
.cw-date {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.55);
  letter-spacing: 0.05em;
  text-transform: uppercase;
  margin-bottom: 1rem;
  font-weight: 300;
}

/* ─── Stat rows ───────────────────────────────────────────────────────────── */
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
  border-bottom: none; /* Drop the trailing separator */
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

/* Compass direction sits quieter than the numeric value */
.cw-stat-value em {
  font-style: normal;
  color: rgba(255, 255, 255, 0.65);
  font-size: 0.75em;
}

/* ─── Responsive ──────────────────────────────────────────────────────────── */
@media (max-width: 500px) {
  /* Stack columns vertically on narrow screens */
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