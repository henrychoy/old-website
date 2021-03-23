/*jshint esversion: 6 */

let form = document.getElementById("form");
let inputValue = document.getElementById("inputValue");
let display = document.getElementById("display");


function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getWeather);
    } else {
        window.console.log("Browser does not support geolocation!");
    }
}

getLocation();

function getWeather(position){
    let lat = position.coords.latitude;
    let long = position.coords.longitude;
    let request = new XMLHttpRequest();
    request.open('GET', 'https://api.openweathermap.org/data/2.5/weather?lat='+ lat +'&lon='+ long +'&units=imperial&mode=json&appid=70ef88575b961360bd130eeab051f901', true);

    request.onload = function () {
        if (request.status === 200 && navigator.geolocation) {

            let data = JSON.parse(request.responseText);

            display.innerHTML = "<h3>Current conditions in your area: ".concat(data.name, "</h3> <br>\n                                 <img id='weather' src=\"https://openweathermap.org/img/w/").concat(data.weather[0].icon, ".png\" alt=\"conditions\"> <br>\n                                 Temperature: ").concat(data.main.temp.toFixed(0), "&deg <br>\n                                 Feels like: ").concat(data.main.feels_like.toFixed(0), "&deg <br>\n                                 Conditions: ").concat(data.weather[0].description, " <br>\n                                 ");
            window.console.log(data);
        }
        if (request.status === 404) {
            display.innerHTML = "Weather data unavailable! Please try again later.";
        }

    };

    request.send();
}






