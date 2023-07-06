import {
  createForecast,
  createFailureMessage,
  createSuccessMessage,
  weekday,
} from "./generateHTML.js";

const searchContainer = document.getElementById("searchContainer");
searchContainer.addEventListener("submit", searchForLocationByName);

const weatherContainer = document.getElementById("weatherContainer");

const apiKey = atob(`ZGI5ZjBmZmZiNDdlNWFlMjE3OTVjNTVhZmRjNmExNjU`);

window.addEventListener("DOMContentLoaded", (event) => {
  //Once loaded, ask for geolocation
  navigator.geolocation.getCurrentPosition(success, fail);
});

const success = ({ coords }) => {
  //Geolocation got sucessful, pass coordinates to get the weather forecast
  getWeatherData(coords.latitude, coords.longitude);
};

function fail({ code }) {
  //Geolocation not successfully got
  weatherContainer.insertAdjacentHTML("beforeend", createFailureMessage(code));
}

// async
async function searchForLocationByName(event) {
  event.preventDefault();

  const searchField = searchContainer.elements.namedItem("searchField").value;

  if (validateSearchInput(searchField)) {
    let { data } = await callNameAPI(searchField);

    if (data.length === 0) {
      weatherContainer.innerHTML = "";
      weatherContainer.insertAdjacentHTML(
        "afterbegin",
        createFailureMessage(5)
      );
    } else {
      getWeatherData(data[0].lat, data[0].lon);
    }
  }
}

async function getWeatherData(lat, lon) {
  weatherContainer.innerHTML = "";

  const { data } = await callWeatherAPI(lat, lon);

  setForecast(data);
}

const setForecast = (data) => {
  const mappedForecast = data.list.map(function (fore) {
    return [
      fore.dt_txt, // Time is in UTC
      fore.main.temp,
      fore.main.feels_like,
      fore.weather[0].description,
      fore.weather[0].icon,
    ];
  });

  const filterForecast = mappedForecast.filter(function (item) {
    return item[0].includes("12:");
  });

  weatherContainer.insertAdjacentHTML(
    "beforeend",
    createSuccessMessage(data.city.name, data.city.country)
  );

  weatherContainer.insertAdjacentHTML(
    "beforeend",
    createForecast(filterForecast, weekday)
  );
};

const validateSearchInput = (searchInput) => {
  if (searchInput === "") {
    weatherContainer.innerHTML = "";
    weatherContainer.insertAdjacentHTML("afterbegin", createFailureMessage(4));
    return false;
  }
  return true;
};

async function callNameAPI(name) {
  const APIReturnName = await axios.get(
    `https://api.openweathermap.org/geo/1.0/direct?q=${name}&limit=1&appid=${apiKey}`
  );
  return APIReturnName;
}

async function callWeatherAPI(lat, lon) {
  const units = `metric`;
  const resultCount = 40;

  const APIReturnWeather = await axios.get(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=${resultCount}&units=${units}&appid=${apiKey}`
  );
  return APIReturnWeather;
}
