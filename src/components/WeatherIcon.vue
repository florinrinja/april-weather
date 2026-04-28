<script setup lang="ts">
import { computed } from "vue";
import type { WeatherConditionType } from "../types/weather";

// defining props with default values
const props = withDefaults(defineProps<{ type: WeatherConditionType; size?: string }>(), { size: 'sm' });

// getting the icon source based on the weather condition type
const iconSrc = computed(() => {
  // Return an empty string or a default icon path if type is not provided
  if (!props.type) {
    return "";
  }

  return new URL(`../assets/images/${props.type}.svg`, import.meta.url).href
});
</script>

<template>
  <img 
    :src="iconSrc" 
    :alt="type" 
    :class="size"
  />
</template>

<style scoped>
img {
  max-width: 3rem;
  height: auto;
}

img.sm {
  max-width: 3rem;
}

img.lg {
  max-width: 6rem;
}
</style>