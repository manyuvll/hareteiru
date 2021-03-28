import React from 'react'

const WEATHER_STATUS = {
    day: {
      sunny: {
        background: "sunny-day",
        illustration: "sunny",
        illustration_complement: ""
      },
      cloudy: {
        background: "sunny-day",
        illustration: "sunny",
        illustration_complement: "cloudy"
      },
      rainy: {
        background: "sunny-day",
        illustration: "sunny",
        illustration_complement: "rainy"
      },
      snowy: {
        background: "sunny-day",
        illustration: "sunny",
        illustration_complement: "snowy"
      },
    },
    night: {
      clear: {
        background: "moon-night",
        illustration: "starry",
        illustration_complement: ""
      },
      cloudy: {
        background: "moon-night",
        illustration: "moon",
        illustration_complement: ""
      },
      rainy: {
        background: "moon-night",
        illustration: "moon",
        illustration_complement: ""
      },
      snowy: {
        background: "moon-night",
        illustration: "moon",
        illustration_complement: ""
      },
    }
}

export function createWeatherContext() {
    return React.createContext(WEATHER_STATUS.day.status);
}

export function getCurrentTheme(value) {
    if(!value) {
        console.log("NO VALUE")
        return WEATHER_STATUS.day.sunny
    }
    console.log("theme: ", value)
    const icon = value.weather[0].icon;
    switch (icon) {
        case '01d':
            return WEATHER_STATUS.day.sunny;
        case '01n':
            return WEATHER_STATUS.night.clear;
        case '02d':
            return WEATHER_STATUS.day.cloudy;
        case '02n':
            return WEATHER_STATUS.night.cloudy;
        case '03d':
            return WEATHER_STATUS.day.cloudy;
        case '03n':
            return WEATHER_STATUS.night.cloudy;
        case '04d':
            return WEATHER_STATUS.day.cloudy;
        case '04n':
            return WEATHER_STATUS.night.cloudy;
        case '09d':
            return WEATHER_STATUS.day.cloudy;
        case '09n':
            return WEATHER_STATUS.night.cloudy;
        case '10d':
            return WEATHER_STATUS.day.cloudy;
        case '10n':
            return WEATHER_STATUS.night.cloudy;
        case '11d':
            return WEATHER_STATUS.day.cloudy;
        case '11n':
            return WEATHER_STATUS.night.cloudy;
        case '13d':
            return WEATHER_STATUS.day.cloudy;
        case '13n':
            return WEATHER_STATUS.night.cloudy;
        case '50d':
            return WEATHER_STATUS.day.cloudy;
        case '50n':
            return WEATHER_STATUS.night.cloudy;                    
        default:
          return WEATHER_STATUS.day.sunny;
      }
}