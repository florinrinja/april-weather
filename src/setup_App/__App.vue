<script lang="ts">
import { defineComponent } from "vue";
import { useAppSetup } from "./__App.setup.ts";
import CurrentWeather from "./components/CurrentWeather.vue";
import ForecastCard from "./components/ForecastCard.vue";
import AppState from "./components/AppState.vue";

export default defineComponent({
  components: { CurrentWeather, ForecastCard, AppState },

  setup() {
    // All logic lives in the companion file — setup() just wires it in.
    return useAppSetup();
  },
});
</script>

<template>
  <!-- Full-viewport wrapper; receives the dynamic gradient as an inline style -->
  <div class="app" :style="bgStyle">
    <!-- Purely decorative ambient blobs — no interaction, no semantics -->
    <div class="blob blob-1" />
    <div class="blob blob-2" />

    <div class="card">
      <!--
        AppState handles every non-success state:
        - 'loading' → spinner
        - 'denied'  → geolocation permission refused
        - 'error'   → API or network failure
      -->
      <AppState v-if="state !== 'success'" :type="state" />

      <!--
        Only render weather content once both the current entry
        and city name are available, avoiding partial renders.
      -->
      <template v-else-if="current && city">
        <!-- Hero section: icon, temperature, condition label, city -->
        <CurrentWeather :entry="current" :city="city" />

        <div class="divider" />

        <!-- Horizontal strip of upcoming forecast cards -->
        <div class="forecast-strip">
          <ForecastCard v-for="(fc, i) in forecasts" :key="i" :forecast="fc" />
        </div>
      </template>
    </div>

    <footer class="app-footer">
      Data from
      <a href="https://openweathermap.org/" target="_blank">OpenWeatherMap</a>
    </footer>
  </div>
</template>

<style>
/* ─── Global reset ────────────────────────────────────────────────────────── */
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

/* Ensure the Vue mount point fills the viewport */
#app {
  height: 100%;
}
</style>

<style scoped>
/* ─── Layout ──────────────────────────────────────────────────────────────── */
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  /* Smooth colour shift when the weather condition changes */
  transition: background 1.2s ease;
  position: relative;
  overflow: hidden;
}

/* ─── Decorative blobs ────────────────────────────────────────────────────── */
.blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  opacity: 0.25;
  pointer-events: none;
  /* Never intercept clicks */
}

/* Top-right highlight */
.blob-1 {
  width: 320px;
  height: 320px;
  background: rgba(255, 255, 255, 0.6);
  top: -80px;
  right: -80px;
}

/* Bottom-left shadow counterweight */
.blob-2 {
  width: 220px;
  height: 220px;
  background: rgba(0, 0, 0, 0.25);
  bottom: -40px;
  left: -40px;
}

/* ─── Glassmorphism card ──────────────────────────────────────────────────── */
.card {
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 28px;
  padding: 2rem;
  width: 100%;
  max-width: 460px;
  backdrop-filter: blur(20px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15), 0 1px 0 rgba(255, 255, 255, 0.3) inset;
  /* Subtle top-edge shimmer */
  animation: fadeUp 0.6s ease both;
}

/* Hairline separator between current weather and forecast strip */
.divider {
  height: 1px;
  background: rgba(255, 255, 255, 0.18);
  margin: 1.25rem 0;
}

.forecast-strip {
  display: flex;
  gap: 0.6rem;
}

/* ─── Footer ──────────────────────────────────────────────────────────────── */
.app-footer {
  margin-top: 1.25rem;
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.35);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  z-index: 1;
  /* Stay above the blobs */
}

/* ─── Entrance animation ──────────────────────────────────────────────────── */
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

/* ─── Responsive ──────────────────────────────────────────────────────────── */
@media (max-width: 480px) {
  .card {
    padding: 1.5rem 1.25rem;
  }

  .forecast-strip {
    gap: 0.4rem;
  }
}
</style>
