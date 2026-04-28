import type { WeatherEntry, DailyForecast, WeatherConditionType } from '../types/weather'

export const WIND_DIRECTIONS = [
  'N', 'NNE', 'NE', 'ENE',
  'E', 'ESE', 'SE', 'SSE',
  'S', 'SSW', 'SW', 'WSW',
  'W', 'WNW', 'NW', 'NNW',
]

export function degreesToCompass(deg: number): string {
  const idx = Math.floor(deg / 22.5 + 0.5) % 16
  return WIND_DIRECTIONS[idx]
}

export function msToKmh(ms: number): number {
  return Math.round(ms * 3.6)
}

export function formatDay(date: Date): string {
  return date.toLocaleDateString('en-US', { weekday: 'long' })
}

export function formatFullDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })
}

export const CONDITION_COLORS: Record<WeatherConditionType | 'default' | 'error', string> = {
  Clear:       '#F5A623',
  Clouds:      '#7EB8D4',
  Rain:        '#4A90D9',
  Drizzle:     '#5BA8D4',
  Thunderstorm:'#5A6080',
  Snow:        '#B8D0E0',
  Mist:        '#9BADB8',
  Fog:         '#9BADB8',
  Haze:        '#B8A882',
  default:     '#8EA8C0',
  error:       '#D4756B',
}

export const CONDITION_GRADIENTS: Record<WeatherConditionType | 'default' | 'error', [string, string]> = {
  Clear:        ['#FFD166', '#F8A21A'],
  Clouds:       ['#90C5DB', '#5A96B5'],
  Rain:         ['#5B9FD8', '#2E6FA8'],
  Drizzle:      ['#6DB5D8', '#3E88B5'],
  Thunderstorm: ['#6A718E', '#3A4060'],
  Snow:         ['#D8EAF5', '#A8C8E0'],
  Mist:         ['#B0C4CF', '#7A98A8'],
  Fog:          ['#B0C4CF', '#7A98A8'],
  Haze:         ['#CFC8A0', '#A89E78'],
  default:      ['#A8C0D4', '#6A90A8'],
  error:        ['#D48078', '#B85850'],
}

export function getConditionEmoji(condition: WeatherConditionType): string {
  const map: Record<WeatherConditionType, string> = {
    Clear:        '☀️',
    Clouds:       '☁️',
    Rain:         '🌧️',
    Drizzle:      '🌦️',
    Thunderstorm: '⛈️',
    Snow:         '❄️',
    Mist:         '🌫️',
    Fog:          '🌫️',
    Haze:         '🌁',
  }
  return map[condition] ?? '🌡️'
}

/**
 * Groups forecast entries by day, filters to midday entries,
 * skips today, and returns the next N days.
 */
export function buildDailyForecasts(entries: WeatherEntry[], days = 4): DailyForecast[] {
  const today = new Date().getDate()
  return entries
    .filter(e => {
      const d = new Date(e.dt_txt)
      return d.getDate() !== today && d.getHours() === 12
    })
    .slice(0, days)
    .map(e => ({
      date:      new Date(e.dt_txt),
      dayName:   formatDay(new Date(e.dt_txt)),
      condition: e.weather[0].main as WeatherConditionType,
      tempAvg:   e.main.temp,
      feelsLike: e.main.feels_like,
      humidity:  e.main.humidity,
      windSpeed: e.wind.speed,
      windDir:   e.wind.deg,
      pop:       e.pop ?? 0,
    }))
}
