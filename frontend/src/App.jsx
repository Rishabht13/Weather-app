import "./App.css";
import { useState } from "react";
import axios from "axios";

function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  const handleSearch = async () => {
    if (!city.trim()) {
      return;
    }

    const response = await axios.get(
      `http://api.weatherapi.com/v1/current.json?key=632a3c2560504418875173031262807&q=${city}`,
    );

    setWeatherData(response.data);
    setCity("");
  };

  return (
    <div className="App">
      <h1>Weather App</h1>
      <input type="text" placeholder="Enter city name" value={city} onChange={(e) => setCity(e.target.value)}
      onKeyPress={(e) => {
        if (e.key === "Enter") {
          handleSearch();
        }
      }}
      />
      <button onClick={handleSearch}>Get Weather</button>
      <div className="weather-info">
        {weatherData && (
          <div>
            <h2>
              {weatherData.location.name}, {weatherData.location.country}
            </h2>
            <p>Temperature: {weatherData.current.temp_c}°C</p>
            <p>Condition: {weatherData.current.condition.text}</p>
            <p>Humidity: {weatherData.current.humidity}%</p>
            <p>Wind Speed: {weatherData.current.wind_kph} kph</p>
            <p>Last Updated: {weatherData.current.last_updated}</p>
            <img
              src={
                weatherData.current.condition.icon.startsWith("http")
                  ? weatherData.current.condition.icon
                  : `https:${weatherData.current.condition.icon}`
              }
              alt={weatherData.current.condition.text}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
