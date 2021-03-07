/*jshint esversion: 6 */

const display = document.getElementById("display");

const xhr = new XMLHttpRequest();
xhr.withCredentials = false;

xhr.addEventListener("readystatechange", function () {
    if (this.readyState === this.DONE) {
        const data = JSON.parse(xhr.responseText);
        window.console.log(data.filter(function(item){
            return item.team.name === "celtics";
        }));

        display.innerHTML = `${data.data[0].team.name}`;
    }


});

xhr.open("GET", "https://www.balldontlie.io/api/v1/players");


xhr.send();