# Weather App — Vue 3 + TypeScript

A clean weather app built with Vue 3, TypeScript, and Vite. Uses the OpenWeatherMap forecast API with geolocation.

## Features

- 🌤 Current weather with temperature, feels like, humidity, wind
- 📅 4-day midday forecast strip
- 🎨 Dynamic gradient background per weather condition
- 💎 Glassmorphism card UI
- 🧭 Inline SVG weather icons (no external image deps)
- 🔒 Typed throughout with TypeScript

## Project Structure

```
src/
├── components/
│   ├── AppState.vue       # Loading / error / denied states
│   ├── CurrentWeather.vue # Main current-conditions display
│   ├── ForecastCard.vue   # Single forecast day card
│   └── WeatherIcon.vue    # Inline SVG icons per condition
├── composables/
│   └── useWeather.ts      # Geolocation + API fetching logic
├── types/
│   └── weather.ts         # All TypeScript interfaces
├── utils/
│   └── weatherUtils.ts    # Pure helper functions
├── App.vue
├── main.ts
└── vite-env.d.ts
```

## Setup

```bash
# 1. Install dependencies
npm install

# 2. Add your API key
cp .env.example .env
# Edit .env and set VITE_OWM_API_KEY=your_key_here
# Get a free key at https://openweathermap.org/api

# 3. Run dev server
npm run dev

# 4. Build for production
npm run build
```

## Notes

- The app requests browser geolocation on load — allow it when prompted.
- A `.env` with the original project's API key is included for convenience.
- Run `npm run typecheck` to validate TypeScript without building.
