/**
 * useWeather.ts — Core weather composable
 *
 * Handles the full data lifecycle:
 *   1. Requests the user's geolocation
 *   2. Fetches the OWM 5-day / 3-hour forecast for those coordinates
 *   3. Derives display-ready state (gradient, condition, daily forecasts)
 *
 * Exposes a minimal public API so components stay decoupled from
 * the fetching logic and can react purely to reactive refs.
 */
import { ref, computed } from 'vue';
import axios from 'axios';
import type {
  ForecastResponse,
  WeatherEntry,
  City,
  AppState,
  WeatherConditionType,
} from '../types/weather';
import { buildDailyForecasts, CONDITION_GRADIENTS } from '../utils/weatherUtils';

// ─── Environment variables ─────────────────────────────────────────────────
// Pulled from .env so the API key is never committed to source control.
const API_KEY = import.meta.env.VITE_OWM_API_KEY as string;
const BASE_URL = import.meta.env.VITE_OWM_API_URL as string;

export function useWeather() {

  // ─── Core state ───────────────────────────────────────────────────────────

  /** UI phase: drives which top-level view App.vue renders. */
  const state = ref<AppState>('loading');

  /** The first entry from the OWM list — used as the "current" conditions. */
  const current = ref<WeatherEntry | null>(null);

  /** Resolved city metadata (name, country) returned alongside the forecast. */
  const city = ref<City | null>(null);

  /**
   * Raw 3-hour entries for the full 5-day window.
   * Stored separately so `buildDailyForecasts` can group them by day
   * without mutating `current`.
   */
  const allEntries = ref<WeatherEntry[]>([]);

  // ─── Derived state ─────────────────────────────────────────────────────────

  /**
   * Collapses the raw 3-hour entries into one representative entry per day.
   * Returns an empty array while data is still loading to avoid partial renders.
   */
  const forecasts = computed(() =>
    current.value ? buildDailyForecasts(allEntries.value) : []
  );

  /**
   * Normalises the current condition to a key that CONDITION_GRADIENTS
   * always has an entry for:
   * - 'error'   → shown when the API call fails
   * - 'default' → fallback when current is null (initial / loading state)
   * - otherwise → the OWM main condition string (e.g. "Clear", "Rain")
   */
  const condition = computed<WeatherConditionType | 'default' | 'error'>(() => {
    if (state.value === 'error') return 'error';

    return (current.value?.weather[0].main as WeatherConditionType) ?? 'default';
  });

  /**
   * Two-stop gradient pair for the current condition.
   * Passed to App.vue as an inline background style so the whole
   * viewport shifts colour when conditions change.
   */
  const gradient = computed(() => CONDITION_GRADIENTS[condition.value]);

  // ─── Data fetching ─────────────────────────────────────────────────────────

  /**
   * Calls the OWM forecast endpoint with the resolved coordinates.
   * On success, populates `current`, `allEntries`, and `city`
   * then flips `state` to 'success'.
   * On failure (network error, bad API key, etc.) flips `state` to 'error'.
   */
  async function fetchWeather(lat: number, lon: number) {
    try {
      const { data } = await axios.get<ForecastResponse>(BASE_URL, {
        params: { lat, lon, appid: API_KEY, units: 'metric' },
      });
      allEntries.value = data.list;
      current.value = data.list[0];  // First entry ≈ current conditions
      city.value = data.city;
      state.value = 'success';
    } catch {
      state.value = 'error';
    }
  }

  // ─── Initialisation ────────────────────────────────────────────────────────

  /**
   * Entry point — called once from App.vue's `onMounted`.
   *
   * Requests geolocation permission, then delegates to `fetchWeather`.
   * Two failure modes are handled separately:
   * - Browser doesn't support geolocation → 'error'
   * - User denies the permission prompt   → 'denied'
   */
  function init() {
    if (!navigator.geolocation) {
      state.value = 'error';

      return;
    }

    navigator.geolocation.getCurrentPosition(
      pos => fetchWeather(pos.coords.latitude, pos.coords.longitude),
      () => { state.value = 'denied' }
    );
  };

  // Expose only what components need; allEntries and condition stay internal.
  return { 
    state, 
    current, 
    city, 
    forecasts, 
    condition, 
    gradient, 
    init 
  };
}