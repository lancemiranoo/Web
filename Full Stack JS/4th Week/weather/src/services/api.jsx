import axios from 'axios';

//  Function to fetch weather data from OpenWeatherMap API
export const getWeatherData = async (city) => {
    const API_KEY = '46ef1a2db4a00a118784c1480dc8e0f0';   //  Replace with your OpenWeatherMap API Key
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    try {
        const response = await axios.get(URL);
        return response.data;   //  Return the weather data
    } catch (error) {
        console.error('Error fetching weather data:', error);
        return null;    //  Return null if there's an error
    }
};