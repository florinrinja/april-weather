<script setup lang="ts">
import { onMounted, computed } from "vue";
import { useWeather } from "./composables/useWeather";
import CurrentWeather from "./components/CurrentWeather.vue";
import ForecastCard from "./components/ForecastCard.vue";
import AppState from "./components/AppState.vue";

const { state, current, city, forecasts, gradient, init } = useWeather();

onMounted(init);

const bgStyle = computed(() => ({
  background: `linear-gradient(145deg, ${gradient.value[0]}, ${gradient.value[1]})`,
}));
</script>

<template>
  <div class="app" :style="bgStyle">
    <!-- Decorative blobs -->
    <div class="blob blob-1" />
    <div class="blob blob-2" />

    <div class="card">
      <!-- Loading / Error / Denied -->
      <AppState v-if="state !== 'success'" :type="state" />

      <!-- Weather content -->
      <template v-else-if="current && city">
        <CurrentWeather :entry="current" :city="city" />

        <div class="divider" />

        <div class="forecast-strip">
          <ForecastCard v-for="(fc, i) in forecasts" :key="i" :forecast="fc" />
        </div>
      </template>
    </div>

    <footer class="app-footer">Data from OpenWeatherMap</footer>
  </div>
</template>

<style>
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html,
body {
  height: 100%;
  font-family: "DM Sans", sans-serif;
}

#app {
  height: 100%;
}
</style>

<style scoped>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  transition: background 1.2s ease;
  position: relative;
  overflow: hidden;
}

/* Ambient decorative blobs */
.blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  opacity: 0.25;
  pointer-events: none;
}

.blob-1 {
  width: 320px;
  height: 320px;
  background: rgba(255, 255, 255, 0.6);
  top: -80px;
  right: -80px;
}

.blob-2 {
  width: 220px;
  height: 220px;
  background: rgba(0, 0, 0, 0.25);
  bottom: -40px;
  left: -40px;
}

/* Main card */
.card {
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 28px;
  padding: 2rem;
  width: 100%;
  max-width: 460px;
  backdrop-filter: blur(20px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15), 0 1px 0 rgba(255, 255, 255, 0.3) inset;
  animation: fadeUp 0.6s ease both;
}

.divider {
  height: 1px;
  background: rgba(255, 255, 255, 0.18);
  margin: 1.25rem 0;
}

.forecast-strip {
  display: flex;
  gap: 0.6rem;
}

.app-footer {
  margin-top: 1.25rem;
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.35);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  z-index: 1;
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 480px) {
  .card {
    padding: 1.5rem 1.25rem;
  }
  .forecast-strip {
    gap: 0.4rem;
  }
}
</style>
