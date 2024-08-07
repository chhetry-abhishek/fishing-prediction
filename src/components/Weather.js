import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar'; 
import './Weather.css'; 

const weatherIcon = `${process.env.PUBLIC_URL}/icon/weather.png`;
const windIcon = `${process.env.PUBLIC_URL}/icon/wind.png`;
const humidityIcon = `${process.env.PUBLIC_URL}/icon/humidity.png`;
const umbrellaIcon = `${process.env.PUBLIC_URL}/icon/umbrella.png`;

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState('Noarlunga');
  const [umbrellaNeeded, setUmbrellaNeeded] = useState(false);

  const WEATHER_API_KEY = 'f35b0de185e389ac60cb4e9c08311159';

  useEffect(() => {
    const fetchWeatherData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)}&units=metric&appid=${WEATHER_API_KEY}`
        );
        setWeatherData(response.data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
        setWeatherData(null);
      } finally {
        setLoading(false);
      }
    };

    if (location.trim() !== '') {
      fetchWeatherData();
    } else {
      setWeatherData(null);
    }
  }, [location]);

  useEffect(() => {
    if (weatherData && weatherData.weather) {
      const description = weatherData.weather[0].description;
      setUmbrellaNeeded(description.includes('rain'));
    }
  }, [weatherData]);

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
    setWeatherData(null);
  };

  return (
    <div className="weather-container">
      <Navbar /> {/**/}
      <main className="weather-content">
        <section className="weather-section">
          <div className="weather-card">
            <input
              type="text"
              value={location}
              onChange={handleLocationChange}
              placeholder="Enter location"
              className="input-location"
            />
            <button onClick={() => setLocation(location)} className="btn-fetch">Fetch Data</button>
            {loading ? (
              <p>Loading data...</p>
            ) : (
              <div className="weather-details">
                {weatherData ? (
                  <div>
                    <h2>Weather Data</h2>
                    <p className="location">{weatherData.name}</p>
                    <div className="weather-info">
                      <div>
                        <img className="icon" src={weatherIcon} alt="Weather" />
                        <span>Temperature:</span>
                        <span>{weatherData.main.temp}°C</span>
                      </div>
                      <div>
                        <img className="icon" src={windIcon} alt="Wind" />
                        <span>Wind Speed:</span>
                        <span>{weatherData.wind.speed} m/s</span>
                      </div>
                      <div>
                        <img className="icon" src={humidityIcon} alt="Humidity" />
                        <span>Humidity:</span>
                        <span>{weatherData.main.humidity}%</span>
                      </div>
                      <div>
                        <img className="icon" src={umbrellaIcon} alt="Umbrella" />
                        <span>Carry an umbrella or raincoat if it's raining:</span>
                        <span>{umbrellaNeeded ? 'Yes' : 'No'}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p>No weather data available</p>
                )}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Weather;
