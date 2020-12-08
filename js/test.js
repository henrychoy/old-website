/*jshint esversion: 6 */


const display = document.getElementById("display");
const displayUSA = document.getElementById("display-USA");

getWorld();


function getWorld(e){

    const request = new XMLHttpRequest();
    request.withCredentials = false;
    request.open('GET', 'https://disease.sh/v3/covid-19/states?yesterday=true', true);

    request.onload = function () {
        if (request.status === 200) {
            let data = JSON.parse(request.responseText);
            window.console.log(data);



        }

    };

    request.send();
}



