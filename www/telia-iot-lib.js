/**
 * Created by baardl on 2016-09-02.
 */

evothings.telia = evothings.telia || {}
evothings.telia.iot  = evothings.telia.iot  || {}


/**
 * Initialize AWS Lambda.
 * @param config Object with configuration parameters,
 * see file aws-config.js
 */
evothings.telia.iot.initialize = function(config)
{
    console.log("Initialize. Try to access " + config.healthEndpoint);

    var xhttp = new XMLHttpRequest();

    //xhttp.open("GET", config.healthEndpoint, true);
    xhttp.open("GET",config.healthEndpoint + "1234", true);
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log("Response: " +this.responseText);
        } else {
            console.log("State: " + this.readyState + ", status: " + this.status + ", response: " + this.responseText);
        }
    };
    xhttp.onerror = function(){console.log("error: " + xhttp.status + ", errortext: " + xhttp.statusText)}

    /*request.onreadystatechange = function() {//Call a function when the state changes.
        if (request.readyState == 4) {
            if (request.status == 200 || request.status == 0) {
                var tweets = JSON.parse(request.responseText);
                var data = "<table cellspacing='0'>";
                var tableClass;
                for (i = 0; i < tweets.results.length; i++) {
                    if (i % 2 == 0) {
                        tableClass = 'tweetOdd';
                    }
                    else {
                        tableClass = 'tweetEven';
                    }
                    data += "<tr style='border: 1px solid black'>";
                    data += "<td class='" + tableClass + "'>";
                    data += "<img src='" + tweets.results[i].profile_image_url + "'/>";
                    data += "</td>";
                    data += "<td class='" + tableClass + "'>";
                    data += "<b>" + tweets.results[i].from_user + "</b><br/>";
                    data += tweets.results[i].text + "<br/>";
                    data += tweets.results[i].created_at;
                    data += "</td>";
                    data += "</tr>";
                }
                data += "</table>";
                var twitter = document.getElementById("latestTweets");
                twitter.innerHTML = data;
            }
        }
    }
    console.log("asking for tweets");
    */
    xhttp.send();



}

