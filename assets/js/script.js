var submit = document.getElementById("submit");
var city;

submit.addEventListener("click", function() {
    event.preventDefault();
    var city = document.getElementById("city").value;
    var allCities = [];

    allCities = JSON.parse(localStorage.getItem("allCities")) || [];
    allCities.push(city);
    localStorage.setItem("allCities", JSON.stringify(allCities));

    getWeather();
});

function renderForecast(weather) {
    console.log(weather);

    //converting unixTimeStamp: https://coderrocketfuel.com/article/convert-a-unix-timestamp-to-a-date-in-vanilla-javascript

    let unixTimestamp = weather.current.dt

    const dateObject = new Date(unixTimestamp * 1000); 
    let humanDateFormat = dateObject.toLocaleString();
    humanDateFormat = humanDateFormat.split(",");
    humanDateFormat = humanDateFormat[0];

    let temp = Math.round(((weather.current.temp - 273.15) * 9) / 5 + 32);
    
    let windSpeed = weather.current.wind_speed

    let humid = weather.current.humidity
    
    let UV = weather.current.uvi

    $("#weatherContainer").append(
        "<div class='listGroup col-12 col-md-12'>"
        +   "<h3 class='oneDayTitle'>" + city + " (" + humanDateFormat + ")" + "</h3>"
        +   "<div class='oneDay'>" + "Time: 12pm " + "</div>"
        +   "<div class='oneDay'>" + "Temperature: " + temp + " °F" + "</div>"
        +   "<div class='oneDay'>" + "Humidity: " + humid + "%" + "</div>"
        +   "<div class='oneDay'>" + "Wind Speed: " + windSpeed + " MPH" + "</div>"
        +   "<div class='oneDay'>" + "UVI: " + UV + "</div>"
        +
        "</div>"
    )

    for(var i = 0; i < weather.daily.length - 3; i++) {
        $("#weatherContainer").append(
            "<div class='listGroup col-12 col-md-12'>"
            +   
            +   "<div class='oneDay'>" + "Time: 12pm " + "</div>"
            +   "<div class='oneDay'>" + "Temperature: " + temp + " °F" + "</div>"
            +   "<div class='oneDay'>" + "Humidity: " + humid + "%" + "</div>"
            +   "<div class='oneDay'>" + "Wind Speed: " + windSpeed + " MPH" + "</div>"
            +   "<div class='oneDay'>" + "UVI: " + UV + "</div>"
            +
            "</div>"
        )
    }
}

function getForecast(coordinates) {
    console.log(coordinates);

    var lat = coordinates[0].lat
    var lon = coordinates[0].lon

    console.log(lat, lon);

    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=82aa2c8af221b40909b689982bed938d`)
    .then(function(response) {
        if (response.ok) {
            return response.json();
        } else {
            alert("Whoops! It seems we can't find that city. Please enter a different one.")
        }
    })
    .then(function(json) {
        renderForecast(json);
    })
};

function getWeather() {
    $("#weatherContainer").empty();
    $("#fiveDay").empty();
    $("#day1").empty();
    $("#day2").empty();
    $("#day3").empty();
    $("#day4").empty();
    $("#day5").empty();

    city = document.getElementById("city").value;

    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=82aa2c8af221b40909b689982bed938d`)


    .then(function(response) {
        if (response.ok) {
            return response.json();
        } else {
            alert("Whoops! It seems we can't find that city. Please enter a different one.")
        }
    })
    .then(function(json) {
        getForecast(json);
        // var date = moment().format("MM/DD/YYYY");


        // $("#fiveDay").append(
        //     "<div class='col-md-12'>"
        //     +
        //     "<h4 id='fiveDay'>" + "5-Day Forecast: <br> <span id='time'>[Weather at 12pm]</span>" + "</h4>"
        //     + "</div>"
        // );

        // $("#day1").append(
        //     "<div class='forecast card col s12 m6'>"
        //     +   "<div class='card-title'>" + moment().add(1, 'days').format('MM/DD/YYYY') + "</div>"
        //     +   "<div class='card-text'>" + "Temp: " + json.list[10].main.temp + " °F" + "</div>"
        //     +   "<div class='card-text'>" + "Humidity: " + json.list[10].main.humidity + "%" + "</div>"
        //     +
        //     "</div>"
        // );

        // $("#day2").append(
        //     "<div class='forecast card col s12 m6'>"
        //     +   "<div class='card-title'>" + moment().add(2, 'days').format('MM/DD/YYYY') + "</div>"
        //     +   "<div class='card-text'>" + "Temp: " + json.list[18].main.temp + " °F" + "</div>"
        //     +   "<div class='card-text'>" + "Humidity: " + json.list[18].main.humidity + "%" + "</div>"
        //     +
        //     "</div>"
        // );

        // $("#day3").append(
        //     "<div class='forecast card col s12 m6'>"
        //     +   "<div class='card-title'>" + moment().add(3, 'days').format('MM/DD/YYYY') + "</div>"
        //     +   "<div class='card-text'>" + "Temp: " + json.list[26].main.temp + " °F" + "</div>"
        //     +   "<div class='card-text'>" + "Humidity: " + json.list[26].main.humidity + "%" + "</div>"
        //     +
        //     "</div>"
        // );

        // $("#day4").append(
        //     "<div class='forecast card col s12 m6'>"
        //     +   "<div class='card-title'>" + moment().add(4, 'days').format('MM/DD/YYYY') + "</div>"
        //     +   "<div class='card-text'>" + "Temp: " + json.list[34].main.temp + " °F" + "</div>"
        //     +   "<div class='card-text'>" + "Humidity: " + json.list[34].main.humidity + "%" + "</div>"
        //     +
        //     "</div>"
        // );

        // $("#day5").append(
        //     "<div class='forecast card col s12 m6'>"
        //     +   "<div class='card-title'>" + moment().add(5, 'days').format('MM/DD/YYYY') + "</div>"
        //     +   "<div class='card-text'>" + "Temp: " + json.list[39].main.temp + " °F" + "</div>"
        //     +   "<div class='card-text'>" + "Humidity: " + json.list[39].main.humidity + "%" + "</div>"
        //     +
        //     "</div>"
        // );
    });
}