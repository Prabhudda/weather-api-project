import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
const API_KEY = '0d13f9bbb334cd9a34eb4612934dd9ad';

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [cityName, setCityName] = useState('');
  const [error, setError] = useState(null);
  const [clicked, setClicked] = useState(false);

  const fetchWeatherData = () => {
    setClicked(true);
    if (cityName.trim() === '') {
      setError('Please enter a valid city name.');
      setWeatherData(null);
      return;
    }

    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`
      )
      .then((response) => {
        setWeatherData(response.data);
        setError(null);
      })
      .catch((error) => {
        setError('Error fetching weather data. Please check the city name.');
        setWeatherData(null);
        console.error('Error fetching weather data:', error);
      });
  };
  if (weatherData) {
    const iconCode = weatherData.weather[0].icon;
    var iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`;
  }

  return (
    <div className='container-fluid px-0 main-container text-light'>
      <div className=' img-overlay'>
        <h1 className='text-center pt-3'>Weather App</h1>
        <div className='container d-flex justify-content-center  align-items-center'>
          <input
            type='text'
            className='input col-lg-8 col-12 my-sm-4 my-3 px-3 py-sm-2 py-1'
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
            onKeyUp={fetchWeatherData}
            placeholder='Enter city name'
            autoFocus
          />
          {/* 
          <button
            className='btn btn-outline-primary mx-sm-3 mx-2 px-sm-5 px-3 py-1'
            onClick={fetchWeatherData}
          >
            Get
          </button>
          */}
        </div>

        <div className='container d-flex justify-content-center  align-items-center'>
          {error && clicked && (
            <p className='alert alert-danger py-1 mt-3'>{error}</p>
          )}
        </div>
        <div className='container mt-3 d-flex justify-content-center  align-items-center'>
          {clicked && weatherData ? (
            <div
              className='px-sm-0 px-2'
              style={{ width: '800px', height: 'auto' }}
            >
              <h2>{weatherData.name}</h2>
              <h5 className='mt-4 temp'>{weatherData.main.temp}°C</h5>
              <div className='text-center'>
                <div className='mx-3'>
                  {weatherData.weather[0].icon && (
                    <div>
                      <img
                        src={iconUrl}
                        alt='Weather Icon'
                        className='img-icon'
                        width={120}
                        height={120}
                      />
                      <h4>
                        {weatherData.weather[0].description
                          .split(' ')
                          .map(
                            (word) =>
                              word.charAt(0).toUpperCase() + word.slice(1)
                          )
                          .join(' ')}
                      </h4>
                    </div>
                  )}
                </div>
              </div>
              <div className='container row d-flex justify-content-between align-items-end mt-5 display-data mx-sm-0 mx-1'>
                <div className='col-lg-3 col-sm-5 col-12 data-container-box d-flex justify-content-center align-items-center'>
                  <div className='d-flex justify-content-center align-items-center flex-column'>
                    <div className='p-sm-3 p-1 d-flex justify-content-center align-items-center flex-column'>
                      <h5 className='m-1'>Humidity</h5>
                      <h5 className='m-1'>{weatherData.main.humidity}%</h5>
                    </div>
                  </div>
                </div>
                <div className='col-lg-3 col-sm-5 col-12 data-container-box d-flex justify-content-center align-items-center mt-md-0 mt-3'>
                  <div className='d-flex justify-content-center align-items-center flex-column'>
                    <div className='p-sm-3 p-1 d-flex justify-content-center align-items-center flex-column'>
                      <h5 className='m-1'>Wind Speed</h5>
                      <h5 className='m-1'>{weatherData.wind.speed} m/s</h5>
                    </div>
                  </div>
                </div>
                <div className='col-lg-3 col-sm-12 mt-lg-0 mt-3 col-12 data-container-box d-flex justify-content-center align-items-center'>
                  <div className='d-flex justify-content-center align-items-center flex-column'>
                    <div className='p-sm-3 p-1 d-flex justify-content-center align-items-center flex-column'>
                      <h5 className='m-1'>Country</h5>
                      <h5 className='m-1'>{weatherData.sys.country}</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default App;
