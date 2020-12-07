/*jshint esversion: 6 */

const form = document.getElementById("form");
const inputValue = document.getElementById("inputValue");
const display = document.getElementById("display");


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
    const request = new XMLHttpRequest();
    request.open('GET', 'http://api.openweathermap.org/data/2.5/weather?lat='+ lat +'&lon='+ long +'&units=imperial&mode=json&appid=70ef88575b961360bd130eeab051f901', true);

    request.onload = function () {
        if (request.status === 200 && navigator.geolocation) {

            const data = JSON.parse(request.responseText);

            display.innerHTML = `<h3>Current conditions in your area: ${data.name}</h3> <br>
                                 <img id='weather' src="http://openweathermap.org/img/w/${data.weather[0].icon}.png" alt="conditions"> <br>
                                 Temperature: ${data.main.temp.toFixed(0)}&deg <br>
                                 Feels like: ${data.main.feels_like.toFixed(0)}&deg <br>
                                 Conditions: ${data.weather[0].description} <br>
                                 `;
            window.console.log(data);
        }
        if (request.status === 404) {
            display.innerHTML = "Weather data unavailable! Please try again later.";
        }

    };

    request.send();
}






