//import Header from '../../components/layout/header';
import useFormInput from '../../utils/form/formInput'
import React, { useState } from 'react'
import useFetchData from '../../utils/fetch/useFetchData'
import { createWeatherApiEndpointUrl } from '../../utils/endpoints'
import * as constants from '../../utils/const'


import './App.css';


export default function App() {
  const city = useFormInput('Tokyo');
  const { fetch, status, value, error } = useFetchData(false);



  const fetchClickHandler = function (event) {
    const cityId = event.target.value;
    const url = createWeatherApiEndpointUrl(cityId);
    fetch(url);
  }

  return (
    <div className="container px-90 mx-auto justify-between items-center">
      <div class="py-20" style={ { background: "linear-gradient(90deg, #667eea 0%, #764ba2 100%)"} }>
        <div class="container mx-auto px-6">
          <h2 class="text-4xl font-bold mb-2 text-white mx-auto">
            Hareteiru 
          </h2>
          <h3 class="text-2xl mb-8 text-gray-200">
          - Weather APP
          </h3>
          {status === constants.IDLE && <div>Start your journey by clicking a button</div>}
          {status === constants.PENDING && <div>Loading...</div>}
          {status === constants.SUCCESS && <div>{JSON.stringify(value)}</div>}
          {status === 'error' && <div>{error}</div>}
        </div>
      </div>
      <div class="flex flex-wrap content-center justify-center">
        <div label="City" class="flex-grow-1 mt-5">
        <input {...city} onClick={fetchClickHandler} type="text" class="mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black" />
        <button type='button' onClick={fetchClickHandler}>Click for Data</button>
        </div>
      </div>
    </div>
  );
}

