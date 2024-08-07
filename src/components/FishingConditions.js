import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FishingConditions.css'; 
import Footer from './Footer';

const weatherIcon = `${process.env.PUBLIC_URL}/icon/weather.png`;
const windIcon = `${process.env.PUBLIC_URL}/icon/wind.png`;
const humidityIcon = `${process.env.PUBLIC_URL}/icon/humidity.png`;
const umbrellaIcon = `${process.env.PUBLIC_URL}/icon/umbrella.png`;

const FishingConditions = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState('Noarlunga');
  const [lastCatches, setLastCatches] = useState([]);
  const [umbrellaNeeded, setUmbrellaNeeded] = useState(false);
  const [inputLocation, setInputLocation] = useState(location);
  const [baitPreferences, setBaitPreferences] = useState([]);

  const WEATHER_API_KEY = 'f35b0de185e389ac60cb4e9c08311159';

  const shuffleArray = (array) => {
    let currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  };

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

  const generateLastCatches = () => {
    const fishNames = [
      'Port Jackson', 'Tommy', 'Australian Salmon', 'Mullet', 'Squid', 'Swimmer Blue Crabs', 'Mackerel', 'Leather Jacket', 'Wrasse', 'Snapper'
    ];
    const shuffledFish = shuffleArray(fishNames);
    setLastCatches(shuffledFish.slice(0, Math.floor(Math.random() * 5) + 1)); 
  };

  const generateBaitPreferences = () => {
    const baits = ['Prawn', 'Live bait', 'Shrimp', 'Octopus', 'Squid', 'Sardine', 'Pilchard'];
    const shuffledBaits = shuffleArray(baits);
    setBaitPreferences(shuffledBaits.slice(0, Math.floor(Math.random() * 3) + 2)); 
  };

  useEffect(() => {
    if (location.trim() !== '') {
      fetchWeatherData();
      generateLastCatches();
      generateBaitPreferences();
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

  const predictFishingConditions = () => {
    if (loading) {
      return 'Loading...';
    }
    if (!weatherData || weatherData.cod === '404') {
      return 'Unable to fetch data at the moment';
    }

    const temperature = weatherData.main.temp;
    const windSpeed = weatherData.wind.speed;

    return (
      <div className={`fishing-condition ${temperature > 15 && windSpeed < 10 ? 'good' : 'poor'}`}>
        <span>{temperature > 15 && windSpeed < 10 ? 'Good fishing conditions 🎣' : 'Poor fishing conditions 🌧️'}</span>
        {umbrellaNeeded && (
          <p>Carry an umbrella or raincoat <img className="icon" src={umbrellaIcon} alt="Umbrella" /></p>
        )}
      </div>
    );
  };

  const handleLocationChange = (e) => {
    setInputLocation(e.target.value);
  };

  const handleFetchData = () => {
    setLocation(inputLocation);
  };

  return (
    <div>
    <div className="fishing-conditions-container">
      <main className="main-content">
        <section className="weather-section">
          <div className="weather-card">
            <input
              type="text"
              value={inputLocation}
              onChange={handleLocationChange}
              placeholder="Enter location"
              className="input-location"
            />
            <button onClick={handleFetchData} className="btn-fetch">Fetch Data</button>
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
                  <p>Unable to fetch data at the moment</p>
                )}
              </div>
            )}
          </div>
        </section>
        {!loading && weatherData && (
          <>
            <section className="fishing-section">
              <div className="fishing-prediction">
                <h2>Fishing Prediction</h2>
                {predictFishingConditions()}
              </div>
              <div className="last-catches">
                <h3>Last {lastCatches.length} Catches</h3>
                <table className="last-catches-table">
                  <tbody>
                    {lastCatches.map((fish, index) => (
                      <tr key={index}>
                        <td>{fish}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="bait-preferences">
                <h3>Bait Preferences</h3>
                <ul>
                  {baitPreferences.map((bait, index) => (
                    <li key={index}>{bait}</li>
                  ))}
                </ul>
              </div>
            </section>
          </>
        )}
      </main>
      </div>
      <Footer />
    </div>
  );
};

export default FishingConditions;
