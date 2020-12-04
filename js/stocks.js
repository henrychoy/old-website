/*jshint esversion: 6 */

const form = document.getElementById("form");
const inputValue = document.getElementById("inputValue");
const display = document.getElementById("display");

document.getElementById("form").addEventListener('submit', getStock);


function getStock(e){
    e.preventDefault();
    const request = new XMLHttpRequest();
    request.withCredentials = false;

    request.onload = function () {
        if (request.status === 200) {
            const data = JSON.parse(request.responseText);
            window.console.log(data.quoteResponse.result[0]);
            const changeAmount = data.quoteResponse.result[0].regularMarketChange.toFixed(2);
            const changePercent = data.quoteResponse.result[0].regularMarketChangePercent.toFixed(2);

            display.innerHTML = "Price: $" + data.quoteResponse.result[0].regularMarketPrice + "<br>" +
            "Change Amount: " + changeAmount + "<br>" +
            "Change Percentage: " + changePercent + "%";
        }
    };

    request.open("GET", 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/v2/get-quotes?symbols='+inputValue.value+'&region=US');
    request.setRequestHeader("x-rapidapi-key", "3eef51a751msh417ccc45b932b59p1193c3jsn30ec989c6278");
    request.setRequestHeader("x-rapidapi-host", "apidojo-yahoo-finance-v1.p.rapidapi.com");

    request.send();
}