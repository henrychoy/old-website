

let display = document.getElementById("display");
let displayUSA = document.getElementById("display-USA");


getStates();
getCountries();
getGlobalTotals();


function getStates(e){
    let request = new XMLHttpRequest();
    request.withCredentials = false;
    request.open('GET', 'https://api.covidtracking.com/v1/states/current.json', true);

    request.onload = function () {
        if (request.status === 200) {
            let dataUSA = JSON.parse(request.responseText);
            window.console.log(dataUSA);


            let time = new Date(Date.parse(dataUSA[21].dateModified));
            document.getElementById("MA-updated").innerHTML = "Last Updated (for MA): " + time;

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


function getCountries(e){
    let request = new XMLHttpRequest();
    request.withCredentials = false;
    request.open('GET', 'https://disease.sh/v3/covid-19/countries?yesterday=true&sort=cases', true);

    request.onload = function () {
        if (request.status === 200) {
            let data = JSON.parse(request.responseText);
            window.console.log(data);


            let htmlString = '';
            for (let i=0; i < data.length; i++) {
                htmlString += `<tr><td class='row-name'>${data[i].country}</td>
                                    <td>${data[i].todayCases.toLocaleString()}</td>
                                    <td>${data[i].todayDeaths.toLocaleString()}</td>
                                    <td>${data[i].cases.toLocaleString()}</td>
                                    <td>${data[i].deaths.toLocaleString()}</td>
                                </tr>`;

                if (data[i].country === 'USA') {
                    document.getElementById("usa-cases").innerHTML = `Total Cases<br>
                                                                       ${data[i].cases.toLocaleString()}<br>
                                                                       +${data[i].todayCases.toLocaleString()}`;
                    document.getElementById("usa-deaths").innerHTML = `Total Deaths<br>
                                                                        <div id="deaths">${data[i].deaths.toLocaleString()}<br>
                                                                        +${data[i].todayDeaths.toLocaleString()}</div>`;
                    document.getElementById("usa-recovered").innerHTML = `Total Recovered<br>
                                                                           <div id="recovered">${data[i].recovered.toLocaleString()}<br>
                                                                           +${data[i].todayRecovered.toLocaleString()}</div>`;
                }
            }

            display.insertAdjacentHTML("afterbegin",htmlString);

        }
        else {
            display.innerHTML = "Data not found! Please try again later";
        }
    };

    request.send();
}


function getGlobalTotals(e) {
    let request = new XMLHttpRequest();
    request.withCredentials = false;
    request.open('GET', 'https://disease.sh/v3/covid-19/all', true);

    request.onload = function () {
        if (request.status === 200) {
            let globalData = JSON.parse(request.responseText);
            window.console.log(globalData);

            document.getElementById("global-cases").innerHTML = `Total Cases<br>
                                                                          ${globalData.cases.toLocaleString()}<br>
                                                                          +${globalData.todayCases.toLocaleString()}`;
            document.getElementById("global-deaths").innerHTML = `Total Deaths<br>
                                                                           <div id="deaths">${globalData.deaths.toLocaleString()}<br>
                                                                           +${globalData.todayDeaths.toLocaleString()}</div>`;
            document.getElementById("global-recovered").innerHTML = `Total Recovered<br>
                                                                              <div id="recovered">${globalData.recovered.toLocaleString()}<br>
                                                                              +${globalData.todayRecovered.toLocaleString()}</div>`;


            let time = new Date(globalData.updated);
            document.getElementById("global-updated").innerHTML = `Last updated: ${time}`;

        }
    };
    request.send();
}


let states = {
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
