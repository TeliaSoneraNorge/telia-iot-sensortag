evothings.aws = evothings.aws || {}
evothings.aws.device = evothings.aws.device || {}


/**
 * Initialize AWS Lambda.
 * @param config Object with configuration parameters,
 * see file aws-config.js
 */
evothings.aws.initialize = function(config)
{
	console.log("Initialize");
	//var awsIot = require('aws-iot-device-sdk');
	/*
	var device = new evothings.awsIot.device({
		"host": "aknrl7ll88rhd.iot.eu-west-1.amazonaws.com",
		"port": 8883,
		"clientId": "baardlTI",
		"thingName": "baardlTI",
		"caCert": "root-CA.crt",
		"clientCert": "04f7c6a417-certificate.pem.crt",
		"privateKey": "04f7c6a417-private.pem.key"
	});

	console.log("device " + device);
	 */
	evothings.aws.lambda = new AWS.Lambda(config);
	console.log("ioddata")
	evothings.aws.iotdata = new AWS.IotData({
		accessKeyId: 'AKIAI3AQYARUN5U76XDA', /*'AKIAIPMMB2KZJPJKU4SQ',*/
		secretAccessKey: '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',/*'v7OnsIr986y6PuU75E0zhOYFvtHwrpJydL43SPZz',*/
		region: 'eu-west-1',
		endpoint: 'aknrl7ll88rhd.iot.eu-west-1.amazonaws.com'});
}

/**
 * Update a sensor.
 * @param sensorid ID of the sensor
 * @param value Value of the sensor
 * @param success Success callback: success()
 * @param error Error callback: success(err)
 */
evothings.aws.update = function(sensorid, value, success, error)
{
	console.log("Update " + sensorid + ", value: " + value);
	/*
	var params = {
      	Payload: JSON.stringify({
      		operation: 'update',
      		sensorid: sensorid,
      		value: value })
    	}
    	*/
	var sensorValue = {
		sensorid: sensorid,
		value: value
	}

	var desired = {
		desired:sensorValue
	}

	var state = {
		state:desired
	}

	var params = {
		topic: '$aws/things/baardlTI/shadow/update',
		payload: JSON.stringify(state),
		qos: 0
	};
	evothings.aws.iotdata.publish(params, function(err, data) {
		if (err) {
			console.log(err, err.stack); // an error occurred
			error(err);
		}
		else {
			console.log("Wrote to " + params.topic +". Result " + JSON.stringify(data));
			success(data);
		}
	});
	/*
	evothings.aws.device.publish('$aws/things/baardlTI/shadow/update', JSON.stringify({
		operation: 'update',
		sensorid: sensorid,
		value: value }));
		*/
	/*
    evothings.aws.lambda.invoke(
    	params,
    	function(err, data) {
			if (err) {
      			error && error(err)
      		}
			else {
      			success && success(data)
      		}
      	}
    )
    */
}

/**
 * Query a sensor.
 * @param sensorid ID of the sensor
 * @param success Success callback: success(items)
 *   (item fields: item.Timestamp, item.Value)
 * @param error Error callback: success(err)
 */
evothings.aws.query = function(sensorid, success, error)
{
	/*
	var params = {
      	Payload: JSON.stringify({
      		operation: 'query',
      		sensorid: sensorid })
    	}
	*/
	var params = {
		thingName: 'baardlTI'
	};
	evothings.aws.iotdata.getThingShadow(params, function (err, data) {
		if (err) {
			console.log(err, err.stack); // an error occurred
			error(err);
		}
		else {
			console.log("Received data: " + JSON.stringify(data));
			success(data);

		}
	});
	//device.subscribe('$aws/things/baardlTI/shadow/update', JSON.stringify({ sensorid: 1}));
/*
    evothings.aws.lambda.invoke(
    	params,
    	function(err, data) {
			if (err) {
      			error && error(err)
      		}
			else {
                var items = JSON.parse(data.Payload).Items
      			success && success(items)
      		}
      	}
    )
    */
}
