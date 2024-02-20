

import React, { useState } from 'react';

import process from 'process';



const Weather = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const fetchWeatherData = async () => {
    const API = '0f0a3e089c77478dacf71054242002'

    const API_ENDPOINT = `https://api.weatherapi.com/v1/current.json?key=${API}&q=${city}`;

    try {
      const response = await fetch(API_ENDPOINT);
      const data = await response.json();

      setWeatherData(data);

      console.log(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-yellow-500 ">
      <div className="bg-white p-8 rounded shadow-md mb-4">
        <h2 className="text-2xl font-bold mb-4">Weather App</h2>

        <input
          type="text"
          placeholder="Enter city name"
          className="border p-2 w-full mb-4"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <button className=" bg-green-500 text-white p-2 rounded" onClick={fetchWeatherData}>
          Get Weather
        </button>
      </div>

      {weatherData && (
        <div className="animate-bounce  mt-10  bg-gradient-to-r from-blue-200 to-sky-300 rounded-md p-">
    <div>
        <h3 className="text-xl font-semibold mb-2">
          Weather in {weatherData.location.name}, {weatherData.location.country}
        </h3>
        <p>
          Condition: {weatherData.current.condition.text}
        </p>
        <p>
          Temperature: {weatherData.current.temp_c}°C
        </p>
        <p>
          Feels Like: {weatherData.current.feelslike_c}°C
        </p>
        <p>
          Wind: {weatherData.current.wind_kph} KMH in {weatherData.current.wind_dir} Direction
        </p>
    </div>
</div>
      )}
    </div>
  );
};

export default Weather;




