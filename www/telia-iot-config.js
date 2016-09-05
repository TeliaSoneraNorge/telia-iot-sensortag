evothings.telia = evothings.telia || {}
evothings.telia.iot = evothings.telia.iot || {}

evothings.telia.iot.config = {
    applId: 'AKIAI3AQYARUN5U76XDAPPF',
    secret: 'AKIAI3AQYARUN5U76XDAPPF',
    devicedataEnpoint: 'https://iot.awsm.works/devicedata/device/',
    //devicedataEnpoint: 'http://localhost:12121/devicedata/device/',
    applicationEndpoint: 'https://iot.awsm.works/application/',
    healthEndpoint: 'https://iot.awsm.works/devicedata/health/',
    params: { FunctionName: 'iot-sensortag' }
}