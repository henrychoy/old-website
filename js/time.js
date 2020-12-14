/*jshint esversion: 6 */


// last updated in footer
document.getElementById("last-updated").textContent = `Last Updated: ${document.lastModified}`;


timeGreeting();

// determine time of day and display proper greeting
function timeGreeting() {
    let time = new Date().getHours();
    let greeting;
    if (time >= 5 && time < 12){          //morning = 5AM - 12PM
        greeting =  "Good morning!";
    }
    else if (time >= 12 && time < 17) {   //afternoon = 12pm - 5pm
        greeting = "Good afternoon!";
    }
    else if (time >= 17 || time < 5) {    //evening = 5pm - 5am
        greeting = "Good evening!";
    }

    document.getElementById("greeting").innerHTML = greeting;
    document.getElementById("greeting").style.fontWeight = "bold";
}
