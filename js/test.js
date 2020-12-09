/*jshint esversion: 6 */


const display = document.getElementById("display");
const displayUSA = document.getElementById("display-USA");

getWorld();


function getWorld(e){

    const request = new XMLHttpRequest();
    request.withCredentials = false;
    request.open("GET", 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/v2/get-quotes?symbols=^DJI,^GSPC&region=US');
    request.setRequestHeader("x-rapidapi-key", "3eef51a751msh417ccc45b932b59p1193c3jsn30ec989c6278");
    request.setRequestHeader("x-rapidapi-host", "apidojo-yahoo-finance-v1.p.rapidapi.com");

    request.onload = function () {
        if (request.status === 200) {
            let data = JSON.parse(request.responseText);
            window.console.log(data);



        }

    };

    request.send();
}



