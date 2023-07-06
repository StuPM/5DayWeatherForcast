export function createForecast(inputArray) {
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let stringToReturn = `<div class="forecastContainer">`;
  for (const fore of inputArray) {
    stringToReturn += `
        <div class="forecastTile">
            <div class="forecastDate">${
              weekday[new Date(fore[0]).getDay()]
            }</div>
            <div class="forecastTempDescriptionContainer">
                <div class="forecastTempContainer">
                    <div class="forecastActualTempContainer">
                        <div>Actual temp:</div>
                        <div>${fore[1]}\u2103</div>
                    </div>
                    <div class="forecastFeelsLikeTempContainer">
                        <div>Feels like:</div>
                        <div>${fore[2]}\u2103</div>
                    </div>               
                </div>
                <img class="forecastIcon" alt="${
                  fore[3]
                } icon" src="https://openweathermap.org/img/wn/${
      fore[4]
    }@2x.png">
            </div>
            <div class="forecastDescription">${fore[3]}</div>
        </div>`;
  }
  stringToReturn += `</div>`;
  return stringToReturn;
}

export function createFailureMessage(code) {
  switch (code) {
    case 1:
      return `<div class="failureMessage">Location service permission denied.<br>Please either allow permission or use the search box to provide a location.</div>`;
    case 2:
      return `<div class="failureMessage">Position is unavaliable, please either refresh your page or use the search box to provide a location.</div>`;
    case 3:
      return `<div class="failureMessage">Location service has timed out, please either refresh your page or use the search box to provide a location.</div>`;
    case 4:
      return `<div class="failureMessage">String string not valid, please try again.</div>`;
    case 5:
      return `<div class="failureMessage">No results returned, please try again.</div>`;
    default:
      return `<div class="failureMessage">Unexpected error with location services.</div>`;
  }
}

export function createSuccessMessage(name, country) {
  return `<div class="successfulMessage">Your location is ${name}, ${country}.</div>`;
}
