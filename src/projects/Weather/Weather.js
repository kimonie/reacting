import React, { useState, useEffect } from 'react';
import './Weather.css';
import { Link } from 'react-router-dom';
import Spinner from '../../components/Spinner/Spinner';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);


  const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
  const getWeather = async () => {

    if (!city) return;

    setLoading(true);
    setError('');
    setWeather(null);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`
      );

      if (!response.ok) {
        throw new Error('City not found');
      }

      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError(err.message || 'Error fetching weather');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`weather-page ${isDarkMode ? 'dark' : ''}`}>
      <div className="weather-box">
        <h2>Weather App</h2>
        <button onClick={() => setIsDarkMode(prev => !prev)}>
          Toggle Theme
        </button>
        <div className="input-section">
          <input
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
             onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  getWeather();
                }
              }}
          />
          <button onClick={getWeather}>Get Weather</button>
        </div>

        {loading && <Spinner />}
        {error && <p className="error">{error}</p>}
        {weather && (
          <div className="weather-result">
            <h3>{weather.name}, {weather.sys.country}</h3>
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
            />
            <p>{weather.weather[0].description}</p>
            <p>{Math.round(weather.main.temp)}°C</p>
          </div>
        )}

        <Link to="/" className="back-link">← Back to Home</Link>
      </div>
    </div>
  );
};

export default Weather;
