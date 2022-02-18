const search = document.querySelector('#search');
const buttonEl = document.querySelector('#searchBtn');
const inputEl = document.querySelector('#searched');
const fiveDayForecast = document.querySelector('#fiveday');
const curForecast = document.querySelector('#today');

const apiKey = '8d11ee23127ece86a8e45e07590427e7';

const getWeather = (city, lat, lon) => {
    const apiUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon' + lon + '&units=imperial&exclude=minutely,hourly,alerts&appid=' + apiKey;
    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json()
                    .then(function (data) {

                        let curDate = new Date(data.current.dt * 1000);
                        let curImg = data.current.weather[0].icon;
                        let curTemp = data.current.temp;

                        const today = document.createElement('h3');
                        const icon = document.createElement('img');
                        const temp = document.createElement('h4');

                        today.innerHTML = city + '(' + curDate.toLocaleDateString() + ')';
                        icon.setAttribute('src', "http://openweathermap.org/img/wn" + curImg + ".png");
                        icon.setAttribute('alt', 'weather icon');
                        temp.innerHTML = 'Temp' + curTemp + '°F';

                        curForecast.append(today);
                        today.append(icon);
                        curForecast.append(temp);
                    });
                curForecast.innerHTML = '';
            } else {
                alert("error" + response.statusText);
            };
        });
};

const findCity = (city) => {
    const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid' + apiKey;

    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json()
                    .then(function (data) {
                        const lat = data.coord.lat;
                        const lon = data.coord.lon;

                        getWeather(city, lat, lon)
                    });
            } else {
                alert("error" + response.statusText);
            };
        });
};

const searchedCity = (event) => {
    event.preventDefault();
    let city = inputEl.value.trim();

    if (city === "") {
        alert("Please enter a city name!");
    } else {
        findCity(city);
    }
};