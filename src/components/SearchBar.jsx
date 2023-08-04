import React, { useState } from "react";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [weatherData, setWeatherData] = useState(null);

  const fetchCitySuggestions = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/find?q=${query}&type=like&appid=${
          import.meta.env.VITE_API_KEY
        }`
      );
      const data = await response.json();
      setSuggestions(data.list.map((city) => city.name));
    } catch (error) {
      console.error("Error fetching city suggestions:", error);
    }
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    setQuery(value);

    if (value.length >= 3) {
      fetchCitySuggestions();
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = async (suggestion) => {
    setQuery(suggestion);
    setSuggestions([]);
    const data = await fetchWeatherData(suggestion);
    setWeatherData(data);
  };

  const fetchWeatherData = async (city) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${
          import.meta.env.VITE_API_KEY
        }`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching weather data:", error);
      return null;
    }
  };

  return (
    <div>
      <div style={{ position: "relative" }}>
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search for a city"
        />
        {suggestions.length > 0 && (
          <div
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              width: "100%",
              backgroundColor: "white",
              border: "1px solid #ccc",
              zIndex: 999,
            }}
          >
            <ul>
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  style={{
                    padding: "8px",
                    cursor: "pointer",
                  }}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      {weatherData && (
        <div>
          <h2>Weather for {weatherData.name}</h2>
          <p>Temperature: {weatherData.main.temp} K</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Description: {weatherData.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
