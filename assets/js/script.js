var submit = document.getElementById("submit");

submit.addEventListener("click", function() {
    event.preventDefault();
    var city = document.getElementById("city").value;
    var allCities = [];

    allCities = JSON.parse(localStorage.getItem("allCities")) || [];
    allCities.push(city);
    localStorage.setItem("allCities", JSON.stringify(allCities));

    getWeather();
});

function getWeather(city) {
    $("#weatherContainer").empty();
    $("#fiveDay").empty();
    $("#day1").empty();
    $("#day2").empty();
    $("#day3").empty();
    $("#day4").empty();
    $("#day5").empty();

    var city = document.getElementById("city").value;

    fetch("https://api.openweathermap.org/data/2.5/forecast?&units=imperial&appid=82aa2c8af221b40909b689982bed938d=" + city )

    .then(function(response) {
        if (response.ok) {
            return response.json();
        } else {
            alert("Whoops! It seems we can't find that city. Please enter a different one.")
        }
    })
    .then(function(json) {
        var date = moment().format("MM/DD/YYYY");

        $("#weatherContainer").append(
            "<div class='listGroup col-12 col-md-12'>"
            +   "<h3 class='oneDayTitle'>" + json.city.name + " (" + date + ")" + "</h3>"
            +   "<div class='oneDay'>" + "Time: 12pm " + "</div>"
            +   "<div class='oneDay'>" + "Temperature: " + json.list[2].main.temp + " °F" + "</div>"
            +   "<div class='oneDay'>" + "Humidity: " + json.list[2].main.humidity + "%" + "</div>"
            +   "<div class='oneDay'>" + "Wind Speed: " + json.list[2].wind.speed + " MPH" + "</div>"
            +
            "</div>"
        )

        $("#fiveDay").append(
            "<div class='col-md-12'>"
            +
            "<h4 id='fiveDay'>" + "5-Day Forecast: <br> <span id='time'>[Weather at 12pm]</span>" + "</h4>"
            + "</div>"
        );

        $("#day1").append(
            "<div class='forecast card col s12 m6'>"
            +   "<div class='card-title'>" + moment().add(1, 'days').format('MM/DD/YYYY') + "</div>"
            +   "<div class='card-text'>" + "Temp: " + json.list[10].main.temp + " °F" + "</div>"
            +   "<div class='card-text'>" + "Humidity: " + json.list[10].main.humidity + "%" + "</div>"
            +
            "</div>"
        );

        $("#day2").append(
            "<div class='forecast card col s12 m6'>"
            +   "<div class='card-title'>" + moment().add(2, 'days').format('MM/DD/YYYY') + "</div>"
            +   "<div class='card-text'>" + "Temp: " + json.list[18].main.temp + " °F" + "</div>"
            +   "<div class='card-text'>" + "Humidity: " + json.list[18].main.humidity + "%" + "</div>"
            +
            "</div>"
        );

        $("#day3").append(
            "<div class='forecast card col s12 m6'>"
            +   "<div class='card-title'>" + moment().add(3, 'days').format('MM/DD/YYYY') + "</div>"
            +   "<div class='card-text'>" + "Temp: " + json.list[26].main.temp + " °F" + "</div>"
            +   "<div class='card-text'>" + "Humidity: " + json.list[26].main.humidity + "%" + "</div>"
            +
            "</div>"
        );

        $("#day4").append(
            "<div class='forecast card col s12 m6'>"
            +   "<div class='card-title'>" + moment().add(4, 'days').format('MM/DD/YYYY') + "</div>"
            +   "<div class='card-text'>" + "Temp: " + json.list[34].main.temp + " °F" + "</div>"
            +   "<div class='card-text'>" + "Humidity: " + json.list[34].main.humidity + "%" + "</div>"
            +
            "</div>"
        );

        $("#day5").append(
            "<div class='forecast card col s12 m6'>"
            +   "<div class='card-title'>" + moment().add(5, 'days').format('MM/DD/YYYY') + "</div>"
            +   "<div class='card-text'>" + "Temp: " + json.list[39].main.temp + " °F" + "</div>"
            +   "<div class='card-text'>" + "Humidity: " + json.list[39].main.humidity + "%" + "</div>"
            +
            "</div>"
        );
    });
}