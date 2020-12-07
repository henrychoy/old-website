/*jshint esversion: 6 */


const display = document.getElementById("display");
const displayUSA = document.getElementById("display-USA");

getUSATotals();
getUSA();
getWorld();

function getUSATotals(e){

    const request = new XMLHttpRequest();
    request.withCredentials = false;
    request.open('GET', 'https://api.covidtracking.com/v1/us/current.json', true);

    request.onload = function () {
        if (request.status === 200) {
            let dataUSA = JSON.parse(request.responseText);
            window.console.log(dataUSA);

            document.getElementById("usa-cases").innerHTML = `Total Cases<br>
                                                                       ${dataUSA[0].positive.toLocaleString()}<br>
                                                                       +${dataUSA[0].positiveIncrease.toLocaleString()}`;
            document.getElementById("usa-deaths").innerHTML = `Total Deaths<br>
                                                                        <div id="deaths">${dataUSA[0].death.toLocaleString()}<br>
                                                                        +${dataUSA[0].deathIncrease.toLocaleString()}</div>`;
            document.getElementById("usa-recovered").innerHTML = `Total Recovered<br>
                                                                           <div id="recovered">${dataUSA[0].recovered.toLocaleString()}<br>
                                                                           ---</div>`;
        }

    };

    request.send();

}

function getUSA(e){

    const request = new XMLHttpRequest();
    request.withCredentials = false;
    request.open('GET', 'https://api.covidtracking.com/v1/states/current.json', true);

    request.onload = function () {
        if (request.status === 200) {
            let dataUSA = JSON.parse(request.responseText);
            window.console.log(dataUSA);

            document.getElementById("MA-updated").innerHTML = `Last Updated (for MA): ${dataUSA[21].dateModified}`;

            let htmlStringUSA = '';
            for (let i=0; i < dataUSA.length; i++) {
                htmlStringUSA += `<tr><td class='row-name'>${states[dataUSA[i].state]}</td>
                                      <td>${dataUSA[i].positiveIncrease.toLocaleString()}</td>
                                      <td>${dataUSA[i].deathIncrease.toLocaleString()}</td>
                                      <td>${dataUSA[i].positive.toLocaleString()}</td>
                                      <td>${dataUSA[i].death.toLocaleString()}</td>
                                 </tr>`;
                }

            displayUSA.insertAdjacentHTML("afterbegin",htmlStringUSA);

            }

        else {
            displayUSA.innerHTML = "Data not found! Please try again later";
        }
    };

    request.send();

}


function getWorld(e){

    const request = new XMLHttpRequest();
    request.withCredentials = false;
    request.open('GET', 'https://api.covid19api.com/summary', true);

    request.onload = function () {
        if (request.status === 200) {
            let data = JSON.parse(request.responseText);
            window.console.log(data);

            document.getElementById("global-cases").innerHTML = `Total Cases<br>
                                                                          ${data.Global.TotalConfirmed.toLocaleString()}<br>
                                                                          +${data.Global.NewConfirmed.toLocaleString()}`;
            document.getElementById("global-deaths").innerHTML = `Total Deaths<br>
                                                                           <div id="deaths">${data.Global.TotalDeaths.toLocaleString()}<br>
                                                                           +${data.Global.NewDeaths.toLocaleString()}</div>`;
            document.getElementById("global-recovered").innerHTML = `Total Recovered<br>
                                                                              <div id="recovered">${data.Global.TotalRecovered.toLocaleString()}<br>
                                                                              +${data.Global.NewRecovered.toLocaleString()}</div>`;


            document.getElementById("global-updated").innerHTML = `Last Updated: ${data.Date}`;


            let htmlString = '';
            for (let i=0; i < data.Countries.length; i++) {
                htmlString += `<tr><td class='row-name'>${data.Countries[i].Country}</td>
                                    <td>${data.Countries[i].NewConfirmed.toLocaleString()}</td>
                                    <td>${data.Countries[i].NewDeaths.toLocaleString()}</td>
                                    <td>${data.Countries[i].TotalConfirmed.toLocaleString()}</td>
                                    <td>${data.Countries[i].TotalDeaths.toLocaleString()}</td>
                                </tr>`;
            }
            display.insertAdjacentHTML("afterbegin",htmlString);

        }
        else {
            display.innerHTML = "Data not found! Please try again later";
        }
    };

    request.send();
}


const states = {
    AZ: 'Arizona',
    AL: 'Alabama',
    AK: 'Alaska',
    AR: 'Arkansas',
    CA: 'California',
    CO: 'Colorado',
    CT: 'Connecticut',
    DC: 'District of Columbia',
    DE: 'Delaware',
    FL: 'Florida',
    GA: 'Georgia',
    HI: 'Hawaii',
    ID: 'Idaho',
    IL: 'Illinois',
    IN: 'Indiana',
    IA: 'Iowa',
    KS: 'Kansas',
    KY: 'Kentucky',
    LA: 'Louisiana',
    ME: 'Maine',
    MD: 'Maryland',
    MA: 'Massachusetts',
    MI: 'Michigan',
    MN: 'Minnesota',
    MS: 'Mississippi',
    MO: 'Missouri',
    MT: 'Montana',
    NE: 'Nebraska',
    NV: 'Nevada',
    NH: 'New Hampshire',
    NJ: 'New Jersey',
    NM: 'New Mexico',
    NY: 'New York',
    NC: 'North Carolina',
    ND: 'North Dakota',
    OH: 'Ohio',
    OK: 'Oklahoma',
    OR: 'Oregon',
    PA: 'Pennsylvania',
    RI: 'Rhode Island',
    SC: 'South Carolina',
    SD: 'South Dakota',
    TN: 'Tennessee',
    TX: 'Texas',
    UT: 'Utah',
    VT: 'Vermont',
    VA: 'Virginia',
    WA: 'Washington',
    WV: 'West Virginia',
    WI: 'Wisconsin',
    WY: 'Wyoming',
    AS: "American Samoa",
    GU: "Guam",
    MP: "Northern Mariana Islands",
    PR: "Puerto Rico",
    VI: "U.S. Virgin Islands",
    UM: "U.S. Minor Outlying Islands",
};





