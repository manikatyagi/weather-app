

import './App.css';
import Search from './components/search/search';
import CurrentWeather from './components/currentWeather/currentWeather';
import Forecast from './components/forecast/forecast';
import { weather_api_key, weather_api_url } from './api';
import { useState } from "react";

function App() {

  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");
    const currWeatherFetch = fetch(`${weather_api_url}/weather?lat=${lat}&lon=${lon}&appid=${weather_api_key}&units=metric`);
    const forecastFetch = fetch(`${weather_api_url}/forecast?lat=${lat}&lon=${lon}&appid=${weather_api_key}&units=metric`);


    Promise.all([currWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast(forecastResponse);
      })
      .catch((err) => console.log(err));

  }
  console.log(currentWeather);
  console.log(forecast);

  return (

    <><div className="container">
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <Forecast data={forecast} />}
    </div>
      <div className='container2'>
        <div className='right'>
          <h1>
          Forecasting Tomorrow, Today: <br/>Your Complete Weather Companion !!!
           
          </h1>
        </div>
        
    </div ></>
  );
}

export default App;
