import React, { useState } from "react";
import { getWeatherData } from "../services/api";

function Weather() {
    //  State variables for city input, weather data, and loading status
    const [city, setCity] = useState(null);
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState('');

    //  Function to fetch weather data when button is clicked
    const handleFetchWeather = async () => {
        if (!city) {
            setError('Please enter a city name.');
            return;
        }

        setLoading(true);   //  Show loading state
        setError('');   //  Clear previous errors
        const data = await getWeatherData(city)
        setLoading(false);  // Hide loading state

        if (data) {
            setWeather(data);   //  Store the fetched data in state
        } else {
            setError('Failed to fetch weather. Try again.');
        }
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px'}}>
            <h1>Simple Weather App</h1>

            {/* Input field for city name */ }
            <input
                type="text"
                placeholder="Enter city name"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                style={{padding: '10px', fontSize: '16px '}}
            />

            {/* Button to fetch weather */}
            <button
                onClick={handleFetchWeather}
                style={{ marginLeft: '10px', padding: '10px', fontSize: '16px'}}>Get Weather</button>

            {/* Display loading Message */}
            {loading && <p>Loading weather data...</p>}

            {/* Display error Message */}
            {error && <p style={{ color: 'red '}}>{error}</p>}

            {/* Display Weather Information if available */}
            {weather && (
                <div style={{ marginTop: '20px' }}>
                    <h2>Weather in {weather.name}</h2>
                    <p>Temperature: {weather.main.temp}</p>
                    <p>Condition: {weather.weather[0].description}</p>
                    <p>Wind Speed: {weather.wind.speed} m/s</p>
                </div>
                )}
        </div>
    );
} 

export default Weather;