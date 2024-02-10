async function getCoordinates(city) {
  const response = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${""}`
  );
  const data = await response.json();
  return { lon: data[0].lon, lat: data[0].lat };
}

async function getWeather(city) {
  const { lon, lat } = await getCoordinates(city);
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${""}&units=metric`
  );
  const data = await response.json();

  document.querySelector(`.city`).innerHTML = data.name;
  document.querySelector(`.temp`).innerHTML = Math.round(data.main.temp) + "°c";
  document.querySelector(`.humidity`).innerHTML = data.main.humidity + "%";
  document.querySelector(`.wind`).innerHTML = data.wind.speed + " km/hr";

  let weatherImageSrc = "./images/clouds.png";
  const weather = data.weather[0].main;
  if (weather == "Clear") {
    weatherImageSrc = "./images/clear.png";
  } else if (weather == "Rain") {
    weatherImageSrc = "./images/rain.png";
  } else if (weather == "Drizzle") {
    weatherImageSrc = "./images/drizzle.png";
  } else if (weather == "Mist") {
    weatherImageSrc = "./images/mist.png";
  } else if (weather == "Rain") {
    weatherImageSrc = "./images/rain.png";
  }
  console.log(weather);

  document.querySelector(`.weather-icon`).src = weatherImageSrc;
}

const inputElement = document.querySelector(`input`);
inputElement.addEventListener("keypress", async (e) => {
  if (e.key === "Enter") {
    const city = inputElement.value;
    await getWeather(city);
  }
});
