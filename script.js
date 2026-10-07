// ---------- Configuration ----------
const API_KEY = "a1bbf0a85048d288486d86e3f07655fa";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

// ---------- Grab elements from the page ----------
const form = document.getElementById("search-form");
const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");

const welcomeEl = document.getElementById("welcome");
const loadingEl = document.getElementById("loading");
const errorEl = document.getElementById("error");
const weatherEl = document.getElementById("weather");

const dateEl = document.getElementById("weather-date");
const cityEl = document.getElementById("weather-city");
const iconEl = document.getElementById("weather-icon");
const tempEl = document.getElementById("weather-temp");
const descEl = document.getElementById("weather-desc");
const feelsEl = document.getElementById("weather-feels");
const humidityEl = document.getElementById("weather-humidity");
const windEl = document.getElementById("weather-wind");
const pressureEl = document.getElementById("weather-pressure");
const sunriseEl = document.getElementById("weather-sunrise");
const sunsetEl = document.getElementById("weather-sunset");

// ---------- UI state helpers ----------
function showLoading() {
  welcomeEl.hidden = true;
  loadingEl.hidden = false;
  errorEl.hidden = true;
  weatherEl.hidden = true;
  searchBtn.disabled = true; // prevent double clicks while fetching
}

function hideLoading() {
  loadingEl.hidden = true;
  searchBtn.disabled = false;
}

function showError(message) {
  welcomeEl.hidden = true;
  errorEl.textContent = message;
  errorEl.hidden = false;
  weatherEl.hidden = true;
}

// ---------- Time helpers ----------
// The API gives times in UTC seconds plus the city's offset from UTC.
// Adding the offset and reading the result as UTC gives the city's local time.
function cityTime(unixSeconds, offsetSeconds) {
  return new Date((unixSeconds + offsetSeconds) * 1000);
}

function formatClock(unixSeconds, offsetSeconds) {
  return cityTime(unixSeconds, offsetSeconds).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: "UTC",
  });
}

function formatDate(unixSeconds, offsetSeconds) {
  return cityTime(unixSeconds, offsetSeconds).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

// ---------- Show the weather ----------
function showWeather(data) {
  const offset = data.timezone;
  const condition = data.weather[0];

  dateEl.textContent = formatDate(data.dt, offset);
  cityEl.textContent = `${data.name}, ${data.sys.country}`;
  iconEl.src = `https://openweathermap.org/img/wn/${condition.icon}@4x.png`;
  iconEl.alt = condition.description;
  tempEl.textContent = `${Math.round(data.main.temp)}°`;
  descEl.textContent = condition.description;

  feelsEl.textContent = `${Math.round(data.main.feels_like)}°`;
  humidityEl.textContent = `${data.main.humidity}%`;
  windEl.textContent = `${data.wind.speed} m/s`;
  pressureEl.textContent = `${data.main.pressure} hPa`;
  sunriseEl.textContent = formatClock(data.sys.sunrise, offset);
  sunsetEl.textContent = formatClock(data.sys.sunset, offset);

  // These two attributes make the CSS pick the right background.
  // Icon codes end in "d" for day and "n" for night (e.g. "01d").
  document.body.dataset.weather = condition.main.toLowerCase();
  document.body.dataset.time = condition.icon.endsWith("n") ? "night" : "day";

  errorEl.hidden = true;
  weatherEl.hidden = false;
}

// ---------- Fetch weather (async/await) ----------
async function fetchWeather(city) {
  const url = `${BASE_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;

  const response = await fetch(url);

  // fetch() does NOT throw on 404/401, so we check response.ok ourselves
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("City not found. Check the spelling and try again.");
    }
    if (response.status === 401) {
      throw new Error("Invalid API key. New keys can take a couple of hours to activate.");
    }
    if (response.status === 429) {
      throw new Error("Too many requests. Please wait a moment and try again.");
    }
    throw new Error(`Something went wrong (error ${response.status}). Please try again.`);
  }

  return await response.json();
}

// ---------- Handle the search ----------
async function handleSearch(event) {
  event.preventDefault(); // stop the form from reloading the page

  const city = cityInput.value.trim();

  // Validate empty input
  if (!city) {
    showError("Please enter a city name.");
    return;
  }

  showLoading();

  try {
    const data = await fetchWeather(city);
    showWeather(data);
  } catch (error) {
    // A TypeError from fetch means the request never reached the server
    if (error instanceof TypeError) {
      showError("Network error. Check your internet connection and try again.");
    } else {
      showError(error.message);
    }
  } finally {
    // Runs whether the request succeeded or failed
    hideLoading();
  }
}

// ---------- Start listening ----------
form.addEventListener("submit", handleSearch);