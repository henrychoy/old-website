/*jshint esversion: 6 */

const form = document.getElementById("form");
const inputValue = document.getElementById("inputValue");
const display = document.getElementById("stock-display");

getDefaultStocks();
document.getElementById("form").addEventListener('submit', getStock);


function getStock(e){
    e.preventDefault();
    const request = new XMLHttpRequest();
    request.withCredentials = false;

    request.onload = function () {
        try {
            const data = JSON.parse(request.responseText);
            window.console.log(data);
            if (data.quoteResponse.result.length === 0){
                document.getElementById("error").innerText = "Invalid input! Please try again.";
                document.getElementById("error").style.color="red";
            }
            else{
                document.getElementById("error").style.display="none";
            }

            const changeAmount = data.quoteResponse.result[0].regularMarketChange.toFixed(2);
            const changePercent = data.quoteResponse.result[0].regularMarketChangePercent.toFixed(2);

            display.style.display = "initial";

            display.innerHTML = `${data.quoteResponse.result[0].longName} (${data.quoteResponse.result[0].symbol})<br>
                                 Price: $${data.quoteResponse.result[0].regularMarketPrice.toFixed(2)}<br>
                                 Chg Amt: <div id="chgAmt">${changeAmount}</div><br>
                                 Chg Percent: <div id="chgPercent">${changePercent}%</div>`;

            if(parseFloat(changeAmount) > 0) {
                document.getElementById("chgAmt").style.color="green";
                document.getElementById("chgAmt").style.display="inline";
                document.getElementById("chgPercent").style.color="green";
                document.getElementById("chgPercent").style.display="inline";

                document.getElementById("stock-display").style.backgroundColor="#d0fcc2";
            }
            else{
                document.getElementById("chgAmt").style.color="red";
                document.getElementById("chgAmt").style.display="inline";
                document.getElementById("chgPercent").style.color="red";
                document.getElementById("chgPercent").style.display="inline";

                document.getElementById("stock-display").style.backgroundColor="#ff9999";
            }
        }
        catch (err){
            document.getElementById("error").innerText = "Invalid input! Please try again.";
            document.getElementById("error").style.color="red";
        }

    };

    request.open("GET", 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/v2/get-quotes?symbols='+inputValue.value+'&region=US');
    request.setRequestHeader("x-rapidapi-key", "3eef51a751msh417ccc45b932b59p1193c3jsn30ec989c6278");
    request.setRequestHeader("x-rapidapi-host", "apidojo-yahoo-finance-v1.p.rapidapi.com");

    request.send();
}


function getDefaultStocks(e){

    const request = new XMLHttpRequest();
    request.withCredentials = false;

    request.onload = function () {
        if (request.status === 200) {
            const data = JSON.parse(request.responseText);
            window.console.log(data);

            /* DOW */
            document.getElementById("dow").innerHTML = `Dow Jones<br>
                                                                ${data.quoteResponse.result[0].regularMarketPrice.toFixed(2)}<br>
                                                                Chg Amt: <div id="dowChgAmt">${data.quoteResponse.result[0].regularMarketChange.toFixed(2)}</div><br>
                                                                Chg Percent: <div id="dowChgPercent">${data.quoteResponse.result[0].regularMarketChangePercent.toFixed(2)}%</div><br>
                                                                `;

            if(parseFloat(data.quoteResponse.result[0].regularMarketChangePercent) > 0) {
                document.getElementById("dowChgAmt").style.color="green";
                document.getElementById("dowChgAmt").style.display="inline";
                document.getElementById("dowChgPercent").style.color="green";
                document.getElementById("dowChgPercent").style.display="inline";

                document.getElementById("dow").style.backgroundColor="#d0fcc2";
            }
            else{
                document.getElementById("dowChgAmt").style.color="red";
                document.getElementById("dowChgAmt").style.display="inline";
                document.getElementById("dowChgPercent").style.color="red";
                document.getElementById("dowChgPercent").style.display="inline";

                document.getElementById("dow").style.backgroundColor="#ff9999";
            }

            /* S&P 500 */
            document.getElementById("sp500").innerHTML = `S&P 500<br>
                                                                ${data.quoteResponse.result[1].regularMarketPrice.toFixed(2)}<br>
                                                                Chg Amt: <div id="spChgAmt">${data.quoteResponse.result[1].regularMarketChange.toFixed(2)}</div><br>
                                                                Chg Percent: <div id="spChgPercent">${data.quoteResponse.result[1].regularMarketChangePercent.toFixed(2)}%</div><br>
                                                                `;

            if(parseFloat(data.quoteResponse.result[1].regularMarketChangePercent) > 0) {
                document.getElementById("spChgAmt").style.color="green";
                document.getElementById("spChgAmt").style.display="inline";
                document.getElementById("spChgPercent").style.color="green";
                document.getElementById("spChgPercent").style.display="inline";

                document.getElementById("sp500").style.backgroundColor="#d0fcc2";
            }
            else{
                document.getElementById("spChgAmt").style.color="red";
                document.getElementById("spChgAmt").style.display="inline";
                document.getElementById("spChgPercent").style.color="red";
                document.getElementById("spChgPercent").style.display="inline";

                document.getElementById("sp500").style.backgroundColor="#ff9999";
            }

            /* NASDAQ */
            document.getElementById("nasdaq").innerHTML = `Nasdaq<br>
                                                                ${data.quoteResponse.result[2].regularMarketPrice.toFixed(2)}<br>
                                                                Chg Amt: <div id="nasChgAmt">${data.quoteResponse.result[2].regularMarketChange.toFixed(2)}</div><br>
                                                                Chg Percent: <div id="nasChgPercent">${data.quoteResponse.result[2].regularMarketChangePercent.toFixed(2)}%</div><br>
                                                                `;

            if(parseFloat(data.quoteResponse.result[2].regularMarketChangePercent) > 0) {
                document.getElementById("nasChgAmt").style.color="green";
                document.getElementById("nasChgAmt").style.display="inline";
                document.getElementById("nasChgPercent").style.color="green";
                document.getElementById("nasChgPercent").style.display="inline";

                document.getElementById("nasdaq").style.backgroundColor="#d0fcc2";
            }
            else{
                document.getElementById("nasChgAmt").style.color="red";
                document.getElementById("nasChgAmt").style.display="inline";
                document.getElementById("nasChgPercent").style.color="red";
                document.getElementById("nasChgPercent").style.display="inline";

                document.getElementById("nasdaq").style.backgroundColor="#ff9999";
            }






        }


    };

    request.open("GET", 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/v2/get-quotes?symbols=^DJI,^GSPC,^IXIC&region=US');
    request.setRequestHeader("x-rapidapi-key", "3eef51a751msh417ccc45b932b59p1193c3jsn30ec989c6278");
    request.setRequestHeader("x-rapidapi-host", "apidojo-yahoo-finance-v1.p.rapidapi.com");

    request.send();
}