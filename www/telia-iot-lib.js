/**
 * Created by baardl on 2016-09-02.
 */

evothings.telia = evothings.telia || {}
evothings.telia.iot  = evothings.telia.iot  || {}



evothings.telia.iot.initialize = function(config){
    evothings.telia.iot.baseDeviceUrl = config.devicedataEnpoint;

}

evothings.telia.iot.update = function(deviceId,payload,success, error){
    console.log("Try to access " + evothings.telia.iot.baseDeviceUrl);

    var xhttp = new XMLHttpRequest();

    console.log("Post to " + deviceId +", payload " + payload);

    var doAsync = true;
     xhttp.open("POST", evothings.telia.iot.baseDeviceUrl + deviceId,doAsync);
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    //xhttp.open("POST", evothings.telia.iot.baseDeviceUrl + deviceId, "{'hei': 'du'");
    //xhttp.open("GET",config.healthEndpoint + "1234", true);
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 ) {
            if (this.status == 200 || this.status == 201) {
                console.log("Response: " + this.responseText);
                success("Updated device: " + deviceId + ", with data: " + payload);
            }
        } else {
            //console.log("State: " + this.readyState + ", status: " + this.status + ", response: " + this.responseText);
        }
    };

    xhttp.onerror = function(){
        console.log("error: " + xhttp.status + ", errortext: " + xhttp.statusText);
        error("Failed to update to " + evothings.telia.iot.baseDeviceUrl + ". Content: " + JSON.stringify(payload) +"\n Reason: " + xhttp.statusText);

    }


    xhttp.send(JSON.stringify(payload));
}

