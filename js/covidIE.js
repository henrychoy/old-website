"use strict";

var display = document.getElementById("display");
var displayUSA = document.getElementById("display-USA");
getStates();
getCountries();
getGlobalTotals();

function getStates(e) {
  var request = new XMLHttpRequest();
  request.withCredentials = false;
  request.open('GET', 'https://disease.sh/v3/covid-19/states?yesterday=true', true);

  request.onload = function () {
    if (request.status === 200) {
      var dataUSA = JSON.parse(request.responseText);
      window.console.log(dataUSA);
      var time = new Date(dataUSA[0].updated);
      document.getElementById("MA-updated").innerHTML = "Last Updated: " + time;
      var htmlStringUSA = '';

      for (var i = 0; i < dataUSA.length; i++) {
        htmlStringUSA += "<tr><td class='row-name'>".concat(dataUSA[i].state, "</td>\n                                      <td>").concat(dataUSA[i].todayCases.toLocaleString(), "</td>\n                                      <td>").concat(dataUSA[i].todayDeaths.toLocaleString(), "</td>\n                                      <td>").concat(dataUSA[i].cases.toLocaleString(), "</td>\n                                      <td>").concat(dataUSA[i].deaths.toLocaleString(), "</td>\n                                 </tr>");
      }

      displayUSA.insertAdjacentHTML("afterbegin", htmlStringUSA);
    } else {
      displayUSA.innerHTML = "Data not found! Please try again later";
    }
  };

  request.send();
}

function getCountries(e) {
  var request = new XMLHttpRequest();
  request.withCredentials = false;
  request.open('GET', 'https://disease.sh/v3/covid-19/countries?yesterday=true&sort=cases', true);

  request.onload = function () {
    if (request.status === 200) {
      var data = JSON.parse(request.responseText);
      window.console.log(data);
      var htmlString = '';

      for (var i = 0; i < data.length; i++) {
        htmlString += "<tr><td class='row-name'>".concat(data[i].country, "</td>\n                                    <td>").concat(data[i].todayCases.toLocaleString(), "</td>\n                                    <td>").concat(data[i].todayDeaths.toLocaleString(), "</td>\n                                    <td>").concat(data[i].cases.toLocaleString(), "</td>\n                                    <td>").concat(data[i].deaths.toLocaleString(), "</td>\n                                </tr>");

        if (data[i].country === 'USA') {
          document.getElementById("usa-cases").innerHTML = "Total Cases<br>\n                                                                       ".concat(data[i].cases.toLocaleString(), "<br>\n                                                                       +").concat(data[i].todayCases.toLocaleString());
          document.getElementById("usa-deaths").innerHTML = "Total Deaths<br>\n                                                                        <div id=\"deaths\">".concat(data[i].deaths.toLocaleString(), "<br>\n                                                                        +").concat(data[i].todayDeaths.toLocaleString(), "</div>");
          document.getElementById("usa-recovered").innerHTML = "Total Recovered<br>\n                                                                           <div id=\"recovered\">".concat(data[i].recovered.toLocaleString(), "<br>\n                                                                           +").concat(data[i].todayRecovered.toLocaleString(), "</div>");
        }
      }

      display.insertAdjacentHTML("afterbegin", htmlString);
    } else {
      display.innerHTML = "Data not found! Please try again later";
    }
  };

  request.send();
}

function getGlobalTotals(e) {
  var request = new XMLHttpRequest();
  request.withCredentials = false;
  request.open('GET', 'https://disease.sh/v3/covid-19/all', true);

  request.onload = function () {
    if (request.status === 200) {
      var globalData = JSON.parse(request.responseText);
      window.console.log(globalData);
      document.getElementById("global-cases").innerHTML = "Total Cases<br>\n                                                                          ".concat(globalData.cases.toLocaleString(), "<br>\n                                                                          +").concat(globalData.todayCases.toLocaleString());
      document.getElementById("global-deaths").innerHTML = "Total Deaths<br>\n                                                                           <div id=\"deaths\">".concat(globalData.deaths.toLocaleString(), "<br>\n                                                                           +").concat(globalData.todayDeaths.toLocaleString(), "</div>");
      document.getElementById("global-recovered").innerHTML = "Total Recovered<br>\n                                                                              <div id=\"recovered\">".concat(globalData.recovered.toLocaleString(), "<br>\n                                                                              +").concat(globalData.todayRecovered.toLocaleString(), "</div>");
      var time = new Date(globalData.updated);
      document.getElementById("global-updated").innerHTML = "Last updated: ".concat(time);
    }
  };

  request.send();
}

var states = {
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
  UM: "U.S. Minor Outlying Islands"
};