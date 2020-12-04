/*jshint esversion: 6 */

const form = document.getElementById("form");
const inputValue = document.getElementById("inputValue");
const display = document.getElementById("display");

document.getElementById("form").addEventListener('submit', getWeather);


function getWeather(e){
    e.preventDefault();
    const request = new XMLHttpRequest();
    request.open('GET', 'http://api.openweathermap.org/data/2.5/weather?q='+inputValue.value+'&units=imperial&mode=json&appid=70ef88575b961360bd130eeab051f901', true);

    request.onload = function () {
        if (request.status === 200) {
            const data = JSON.parse(request.responseText);
            window.console.log(data);
            display.innerHTML = data.main.temp;
        }
        if (request.status === 404) {
            display.innerHTML = "City not found! Please try again.";
        }
    };

    request.send();
}