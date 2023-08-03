import { useEffect, useState } from "react";
import axios from "axios";

const SearchBar = () => {
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${value}&APPID=${
            import.meta.env.VITE_API_KEY
          }`
        );

        setSuggestions(data.weather);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [value]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search data..."
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
      <ul>
        {suggestions.map((suggestion, index) => (
          <li key={index}>{suggestion.main}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchBar;
