import useFormInput from '../../utils/form/formInput'
import React from 'react'
import useFetchData from '../../utils/fetch/useFetchData'
import { createWeatherApiEndpointUrl } from '../../utils/endpoints'
import * as constants from '../../utils/const'

import './App.css';



export default function App() {
  const city = useFormInput('');
  const { fetch, status, value, error } = useFetchData(false);

  const fetchClickHandler = function () {
    const url = createWeatherApiEndpointUrl(city.value);
    fetch(url);
  }

  return (
      <div className={"card--weather " + value?.background}>
        <div className="bg--illustration">
          <div className={value?.illustration}></div>
          <div className={value?.illustration_complement}></div>
        </div>
        <div className="weather--indicator moon-indicator flex flex-col items-center">
            {status === constants.IDLE && <>
              <div className="flex flex-col">
                <div className="text-6xl font-bold"> 
                  Insert a city here. :).
                </div>
                <div className="arrow-container mt-9">
                  <div className="arrow-down"></div>
                </div>
              </div>
            </>}
            {status === constants.PENDING && <>
              <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center">
                <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
                <h2 className="loader-message text-center text-white text-xl font-semibold">Loading...</h2>
                <p className="loader-message w-1/3 text-center text-white">This may take a few seconds, please don't close this page.</p>
              </div>
              </>
            }
            {status === constants.SUCCESS && <> 
              <div className="flex-auto text-6xl font-bold"> 
                {value.weather[0].description.split(/ /g).map(val => val[0].toUpperCase() + val.slice(1)).join(' ')}
              </div>
              <div className="flex-auto text-6xl"> 
                {value.name + ", " + value.sys.country}
              </div>
              <div className="flex-auto text-9xl font-black"> 
                {Math.floor(value.main.temp)}°
              </div>
              </>
            }
            {status === 'error' && <div>{error}</div>}
          </div>
        <div className="m-8 city-search flex" label="City">
          <input {...city} tabIndex="1" onKeyDown={e => e.key === 'Enter' && fetchClickHandler} placeholder="Ex: Tokyo, JP" type="text" className="rounded-md mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black" />
          <button className="bg-yellow-600 hover:bg-yellow-400 text-white font-bold py-2 px-4 rounded" onClick={fetchClickHandler}>Search</button>
        </div>
      </div>
  );
}

