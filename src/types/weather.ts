export interface WeatherMain {
  temp: number
  feels_like: number
  humidity: number
  temp_min: number
  temp_max: number
  pressure: number
}

export interface WeatherCondition {
  id: number
  main: WeatherConditionType
  description: string
  icon: string
}

export interface Wind {
  speed: number
  deg: number
  gust?: number
}

export interface WeatherEntry {
  dt: number
  dt_txt: string
  main: WeatherMain
  weather: WeatherCondition[]
  wind: Wind
  visibility: number
  pop?: number // probability of precipitation
}

export interface City {
  id: number
  name: string
  country: string
  coord: { lat: number; lon: number }
  sunrise: number
  sunset: number
}

export interface ForecastResponse {
  list: WeatherEntry[]
  city: City
}

export type WeatherConditionType =
  | 'Clear'
  | 'Clouds'
  | 'Rain'
  | 'Drizzle'
  | 'Thunderstorm'
  | 'Snow'
  | 'Mist'
  | 'Fog'
  | 'Haze'

export interface DailyForecast {
  date: Date
  dayName: string
  condition: WeatherConditionType
  tempAvg: number
  feelsLike: number
  humidity: number
  windSpeed: number
  windDir: number
  pop: number
}

export type AppState = 'loading' | 'success' | 'error' | 'denied'
