<script setup lang="ts">
defineProps<{ type: "loading" | "error" | "denied" }>();
</script>

<template>
  <div class="state-wrapper">
    <!-- Loading -->
    <template v-if="type === 'loading'">
      <div class="spinner">
        <div class="spin-ring" />
        <div class="spin-ring spin-ring--2" />
      </div>
      <p class="state-label">Locating you…</p>
    </template>

    <!-- Error -->
    <template v-else-if="type === 'error'">
      <span class="state-icon">⚠️</span>
      <p class="state-label">Couldn't fetch weather data.</p>
      <p class="state-sub">Check your API key or network connection.</p>
    </template>

    <!-- Geolocation denied -->
    <template v-else-if="type === 'denied'">
      <span class="state-icon">📍</span>
      <p class="state-label">Location access denied.</p>
      <p class="state-sub">Please allow location access in your browser and reload.</p>
    </template>
  </div>
</template>

<style scoped>
.state-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  min-height: 200px;
  color: #fff;
  text-align: center;
}

.state-icon {
  font-size: 2.5rem;
}

.state-label {
  font-size: 1rem;
  font-weight: 500;
  margin: 0;
}

.state-sub {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.6);
  margin: 0;
}

/* Spinner */
.spinner {
  position: relative;
  width: 56px;
  height: 56px;
}

.spin-ring {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 3px solid transparent;
  border-top-color: rgba(255, 255, 255, 0.9);
  animation: spin 1s linear infinite;
}

.spin-ring--2 {
  inset: 8px;
  border-top-color: rgba(255, 255, 255, 0.4);
  animation-duration: 1.4s;
  animation-direction: reverse;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
