import { API_KEY } from './config.js'
document.addEventListener("DOMContentLoaded", function () {
  const apiKey = API_KEY;
  const countrySelect = document.getElementById("country");
  const weatherResult = document.getElementById("weather-result");

  // Add country options to select
  const countries = ["Colombia", "USA", "Brazil", "Japan", "Australia"];
  countries.forEach((country) => {
    const option = document.createElement("option");
    option.value = country;
    option.textContent = country;
    countrySelect.appendChild(option);
  });

  // Make the API request when a country is selected
  countrySelect.addEventListener("change", async function () {
    const country = countrySelect.value;
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${country}`
      );
      const data = await response.json();
      weatherResult.innerHTML = `
                <h3>Weather in ${country}</h3>
                <p>Temperature: ${data.current.temp_c}°C</p>
                <p>Weather: ${data.current.condition.text}</p>
                <p>Humidity: ${data.current.humidity}%</p>
                <p>Wind: ${data.current.wind_kph} kph (${data.current.wind_dir})</p>
            `;
    } catch (error) {
      weatherResult.innerHTML = "<p>Error fetching weather data</p>";
      console.error("Error:", error);
    }
  });
});
