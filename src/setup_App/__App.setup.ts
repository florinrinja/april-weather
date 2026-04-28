import { onMounted, computed } from 'vue';
import { useWeather } from '../composables/useWeather';

export function useAppSetup() {
  const { 
    state, 
    current, 
    city, 
    forecasts, 
    gradient, 
    init 
  } = useWeather();

  onMounted(init);

  const bgStyle = computed(() => ({
    background: `linear-gradient(145deg, ${gradient.value[0]}, ${gradient.value[1]})`,
  }));

  return { 
    state, 
    current, 
    city, 
    forecasts, 
    bgStyle 
  };
}