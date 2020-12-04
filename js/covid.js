/*jshint esversion: 6 */

const form = document.getElementById("form");
const inputValue = document.getElementById("inputValue");
const display = document.getElementById("display");

window.addEventListener("load", getCovid);


function getCovid(e){
    e.preventDefault();
    const request = new XMLHttpRequest();
    request.withCredentials = true;
    request.open('GET', 'https://api.covid19api.com/summary', true);

    request.onload = function () {
        if (request.status === 200) {
            let data = JSON.parse(request.responseText);
            window.console.log(data);

            let htmlString = '';
            for (let i=0; i < data.Countries.length; i++) {
                if (i % 2 === 0) {
                    htmlString += "<tr class='even'><td class='row-name'>"+data.Countries[i].Country+"</td>" + "<td>"+data.Countries[i].NewConfirmed.toLocaleString()+"</td>"+
                        "<td>"+data.Countries[i].NewDeaths.toLocaleString()+"</td>" + "<td>" + data.Countries[i].TotalConfirmed.toLocaleString() + "</td>" + "<td>"+ data.Countries[i].TotalDeaths.toLocaleString() + "</td></tr>";
                }
                else {
                    htmlString += "<tr><td class='row-name'>"+data.Countries[i].Country+"</td>" + "<td>"+data.Countries[i].NewConfirmed.toLocaleString()+"</td>"+
                        "<td>"+data.Countries[i].NewDeaths.toLocaleString()+"</td>" +" <td>" + data.Countries[i].TotalConfirmed.toLocaleString() + "</td>" + "<td>"+ data.Countries[i].TotalDeaths.toLocaleString() + "</td></tr>";
                }
            }

            display.insertAdjacentHTML("afterbegin",htmlString);


        }
        if (request.status === 404) {
            display.innerHTML = "Data not found! Please try again later";
        }
    };

    request.send();
}