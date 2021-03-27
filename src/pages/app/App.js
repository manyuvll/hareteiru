import useFormInput from '../../utils/form/formInput'
import React from 'react'
import useFetchData from '../../utils/fetch/useFetchData'
import { createWeatherApiEndpointUrl } from '../../utils/endpoints'
import * as constants from '../../utils/const'

import './App.css';

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
      sunny: {
        background: "moon-night",
        illustration: "moon",
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

export default function App() {
  const city = useFormInput('');
  const { fetch, status, value, error } = useFetchData(false);

  const fetchClickHandler = function () {
    const url = createWeatherApiEndpointUrl(city.value);
    fetch(url);
  }

  return (
      <div class="card--weather moon-night">
        <div class="bg--illustration">
          <div class="starry"></div>
          <div class=""></div>
        </div>
        <div class="weather--indicator moon-indicator flex flex-col items-center">
            {/* {status === constants.IDLE && <div>Start your journey by clicking a button</div>} */}
            {status === constants.PENDING && <>
              <div class="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center">
                <div class="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
                <h2 class="loader-message text-center text-white text-xl font-semibold">Loading...</h2>
                <p class="loader-message w-1/3 text-center text-white">This may take a few seconds, please don't close this page.</p>
              </div>
              </>
            }
            {status === constants.SUCCESS && <> 
              <div class="flex-auto text-6xl font-bold"> 
                {value.weather[0].description.split(/ /g).map(val => val[0].toUpperCase() + val.slice(1)).join(' ')}
              </div>
              <div class="flex-auto text-6xl"> 
                {value.name + ", " + value.sys.country}
              </div>
              <div class="flex-auto text-9xl font-black"> 
                {Math.floor(value.main.temp)}°
              </div>
              </>
            }
            {status === 'error' && <div>{error}</div>}
          </div>
        <div class="m-8 city-search flex" label="City">
          <input {...city} tabIndex="1" onkeydown={e => e.key === 'Enter' && fetchClickHandler} placeholder="Ex: Tokyo, JP" type="text" class="rounded-md mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black" />
          <button class="bg-yellow-600 hover:bg-yellow-400 text-white font-bold py-2 px-4 rounded" onClick={fetchClickHandler}>Search</button>
        </div>
      </div>
  );
}

