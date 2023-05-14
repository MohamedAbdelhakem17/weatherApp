// ======================= Get Element
let searchInput = document.getElementById("search");
let Row = document.getElementById("myRow");
let searchBox = document.getElementById("searchBox");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let todayDate = new Date();
console.log(todayDate.getDate());
// ======================= Get Api
async function weather(place) {
  let weatherApi = await fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=da3fc44f6bc5410eb8e142641231405&q=${place}&days=3`,
    { method: "GET" }
  );
  result = await weatherApi.json();
  weatherToDay(result.location, result.current);
  weatherForecast(result.forecast.forecastday);
  searchBox.style.backgroundImage = `url(../img/banner.png)`
}
searchInput.addEventListener("keyup", (event) => {
  weather(event.target.value);
});

// ======================= weatherToDay
function weatherToDay(location, current) {
  Row.innerHTML = `          <div class="col-lg-4 col-12">
  <div class="box">
    <div class="hearder d-flex justify-content-between p-2">
      <h6>${days[todayDate.getDay()]}</h6>
      <h6>${todayDate.getDate()} ${month[todayDate.getMonth()]}</h6>
    </div>
    <div class="body py-5 px-2">
      <h2 class="text-muted fs-5">${location.name}</h2>
      <div
        class="temperature d-flex align-items-center justify-content-center"
      >
        <h3>${current.temp_c}<sup>o</sup>C</h3>
        <img src="${current.condition.icon}" />
      </div>
      <p class="text-primary">${current.condition.text}</p>
      <div
        class="details d-flex align-items-center justify-content-evenly"
      >
        <div><img src="img/icon-compass.png" class="px-2" />${current.wind_dir
    }</div>
        <div><img src="img/icon-wind.png" class="px-2" />${current.wind_mph
    }km/h</div>
        <div>
          <img src="img/icon-umberella.png" class="px-2" />20%
        </div>
      </div>
    </div>
  </div>
</div>`;
}
// ======================= weather Forecast
function weatherForecast(info) {
  for (let i = 1; i < info.length; i++) {

    Row.innerHTML += `
  <div class="col-lg-4 col-12">
<div class="box">
  <div class="hearder d-flex justify-content-center align-items-center p-2">
    <h6>${days[new Date(info[i].date).getDay()]}</h6>
  </div>
  <div class="body py-5 px-2">
    <div class="temperature d-flex align-items-center justify-content-center flex-column">
      <img src="${info[i].day.condition.icon}" />
      <h3>${info[i].day.maxtemp_c}<sup>o</sup>C</h3>
      <p class="text-muted">${info[i].day.mintemp_c}<sup>o</sup>C</p>
      <p class="text-primary">${info[i].day.condition.text}</p>
    </div>
  </div>
</div>
</div>
`;
  }
}
weather("Cairo");
