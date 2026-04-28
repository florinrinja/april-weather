import { ref, computed } from 'vue'
import axios from 'axios'
import type { ForecastResponse, WeatherEntry, City, AppState, WeatherConditionType } from '../types/weather'
import { buildDailyForecasts, CONDITION_GRADIENTS } from '../utils/weatherUtils'

const API_KEY = import.meta.env.VITE_OWM_API_KEY as string;
const BASE_URL = import.meta.env.VITE_OWM_API_URL as string;

export function useWeather() {
  const state     = ref<AppState>('loading')
  const current   = ref<WeatherEntry | null>(null)
  const city      = ref<City | null>(null)
  const forecasts = computed(() =>
    current.value ? buildDailyForecasts(allEntries.value) : []
  )
  const allEntries = ref<WeatherEntry[]>([])

  const condition = computed<WeatherConditionType | 'default' | 'error'>(() => {
    if (state.value === 'error') return 'error'
    return (current.value?.weather[0].main as WeatherConditionType) ?? 'default'
  })

  const gradient = computed(() => CONDITION_GRADIENTS[condition.value])

  async function fetchWeather(lat: number, lon: number) {
    try {
      const { data } = await axios.get<ForecastResponse>(BASE_URL, {
        params: { lat, lon, appid: API_KEY, units: 'metric' },
      })
      allEntries.value = data.list
      current.value    = data.list[0]
      city.value       = data.city
      state.value      = 'success'
    } catch {
      state.value = 'error'
    }
  }

  function init() {
    if (!navigator.geolocation) {
      state.value = 'error'
      return
    }
    navigator.geolocation.getCurrentPosition(
      pos => fetchWeather(pos.coords.latitude, pos.coords.longitude),
      () => { state.value = 'denied' }
    )
  }

  return { state, current, city, forecasts, condition, gradient, init }
}
