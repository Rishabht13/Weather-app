import "./App.css";
import { useState } from "react";
import axios from "axios";

function App() {

  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  const handleSearch = async () => {
    if(!city.trim()) {
      return;
    }
    
    const response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=632a3c2560504418875173031262807&q=${city}`)
    
    setWeatherData(response.data);
    console.log(response.data);
  }

  return (
    <div className="App">
      <h1>Weather App</h1>
      <input 
        type="text" 
        placeholder="Enter city name" 
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={handleSearch}>Get Weather</button>
      <pre> {JSON.stringify(weatherData, null, 2)}</pre>
    </div>
  );
}

export default App;