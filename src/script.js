async function getUserLocation() {
  try {
    if (!navigator.geolocation) {
      throw new Error("Geolocation is not supported by this browser.");
    }

    const position = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });

    const { latitude, longitude } = position.coords;
    await getLocationByCoordinates(latitude, longitude);
  } catch (error) {
    document.getElementById("body").style.filter = "blur(0rem)";
    console.error(error);
  }
}

async function getLocationByCoordinates(lat, lon) {
  const apiKey = "c663d0b0329b48bc7df3038c7d3f81ab";
  const url = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=5&appid=${apiKey}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    const locationName = data[0]?.name.split(" ")[0] || "Unknown";
    await fetchWeatherData(locationName);
  } catch (error) {
    console.error("Error fetching location:", error);
  } finally {
    document.getElementById("body").style.filter = "blur(0rem)";
  }
}

function searchWeatherByLocation() {
  const location = document.getElementById("search").value.trim();
  if (location) {
    fetchWeatherData(location);
  }
}

async function fetchWeatherData(location) {
  const url = `https://api.weatherapi.com/v1/current.json?key=1ffa0449aebc4c59b8e160832241811=${location}&aqi=yes`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (res.ok) {
      updateWeatherDisplay(data);
    } else {
      displayLocationNotFound();
    }
  } catch (error) {
    console.error("Error fetching weather data:", error);
    displayLocationNotFound();
  }
}

function updateWeatherDisplay(data) {
  const {
    current: {
      temp_c,
      feelslike_c,
      condition,
      cloud,
      humidity,
      wind_kph,
      wind_dir,
      gust_kph,
      precip_mm,
      pressure_mb,
      vis_km,
      uv,
    },
    location: { name, region, country },
  } = data;

  updateElement("temp_c", `${temp_c}&#176`);
  updateElement("name", name);
  updateElement("region", `&nbsp;${region}, ${country}`);
  updateElement("feelslike_c", `Feels like ${feelslike_c}&#176`);
  updateElement("condition", condition.text);
  updateElement("cloud", `${cloud}%`);
  updateElement("humidity", `${humidity}%`);
  updateElement("wind_kph", `${wind_kph} Km/h ${wind_dir}`);
  updateElement("gust_kph", `${gust_kph} Km/h`);
  updateElement("precip_mm", `${precip_mm}mm`);
  updateElement("pressure_mb", `${pressure_mb}mb`);
  updateElement("vis_km", `${vis_km} KM`);
  updateElement("uv", `${uv}`);
}

function updateElement(elementId, content) {
  const element = document.getElementById(elementId);
  if (element) {
    element.innerHTML = content;
  }
}

function displayLocationNotFound() {
  const resetElements = document.getElementsByClassName("reset");
  Array.from(resetElements).forEach((element) => (element.innerHTML = ""));

  updateElement("name", "Location not Found");
}

// Initialize location fetching when the page loads
getUserLocation();
