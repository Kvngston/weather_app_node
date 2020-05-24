const http = require('got')
const mapBoxUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
const mapBoxApiKey = 'pk.eyJ1IjoidGtjb2RlcyIsImEiOiJjazF5NTdnZXAwaTY1M2hxZ2xldjdheWtuIn0.IQUowMlRRlGJ2xj6BDOFGw';
const apiKey = 'ae080a3bf225326cee2ddaa9b6405bd7';
const url = 'https://api.openweathermap.org/data/2.5/weather';

const geocode = async (address, callback) => {
    try {
        const mapBoxResponse = await http(mapBoxUrl + encodeURIComponent(address) + '.json?access_token=' + mapBoxApiKey + '&limit=1').json();
        if (mapBoxResponse.message){
            callback('Could not find Location',undefined);
        }else{
            const longitude = mapBoxResponse.features[0].center[0]
            const latitude =  mapBoxResponse.features[0].center[1]
            callback(undefined,{
                longitude,
                latitude
            });
        }
    } catch (e) {
        callback(e, undefined);
    }
}

const forecast = async (longitude, latitude, callback) => {
    try {
        const response = await http(url + '?lat=' + latitude + '&lon=' + longitude + '&' + 'appid=' + apiKey+'&units=metric').json();
        if (response.cod !== 200){
            callback('Bad Request',undefined);
        }else {
            const description = response.weather[0].description
            const temp = response.main.temp
            const humidity = response.main.humidity
            const name = response.name
            callback(undefined, {
                description,
                temp,
                humidity,
                name
            });
        }

    }catch (e) {
        console.log(e);
    }
}

module.exports = {

    geocode: geocode,
    forecast: forecast

}