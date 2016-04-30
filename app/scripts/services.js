var weatherAppServices = angular.module('weatherAppServices', ['ngResource']).
factory('weatherService', ['$resource', '$log', function($resource, $log) {
    /*
    getting weather model from the server and convert it to the weather appmodel.
     */

    var appID = 'ec2c219b7a1e77e72c42859f75e5a345';
    // appID="asdfas";
    var res = $resource('http://api.openweathermap.org/data/2.5/:c/:d', {
        APPID: appID,
        mode: 'json',
        units: 'metric',
        lang: 'en'
    }, {
        currentWeather: {
            params: {
                d: 'weather'
            }
        },
        weatherForecast: {
            params: {
                c: 'forecast',
                d: 'daily',
                cnt: 6
            }
        }
    });
    return {
        /**
         * gets todays weather data based on either location (lat,lon) or the cityName          
         * @param  {[type:string]} cityName         
         * @param  {type:{lat:latitude,lon:longitude}} location 
         * @param  {function(result){}} callbackFunction [use a callback function to return the model, check out the result object properties below]
         * @param  {function(error){}} callbackError    [use a callback fucntion to return the error data]
         * @result: {
            temp: ,
            humidity: ,
            tempMin: ,
            tempMax: ,
            windSpeed: ,
            weatherID: ,
            date: ,
            city: 
        }                
         */
        currentWeather: function(cityName , location , callbackFunction, callbackError) {
            var result = {}
            var query = {}
            if (cityName != '') query = {
                q: cityName
            }
            else if (location != '') query = {
                lat: location.lat,
                lon: location.lon
            }
            
            res.currentWeather(query, function(data) {

                result = {
                    temp: data.main.temp,
                    humidity: data.main.humidity,
                    tempMin: data.main.temp_min,
                    tempMax: data.main.temp_max,
                    windSpeed: data.wind.speed,
                    weatherID: data.weather[0].id,
                    date: (data.dt * 1000),
                    city: data.name,
                    country: data.city.country
                }
                callbackFunction(result);
            }, function(error) {
                callbackError(error);
            });
        },
        /**
         * gets todays weather forecast data for 6 days in an array format based on either location (lat,lon) or the cityName          
         * @param  {[type:string]} cityName         
         * @param  {type:{lat:latitude,lon:longitude}} location 
         * @param  {function(result){...}} callbackFunction [use a callback function to return the converted model]
         * @param  {function(error){...}} callbackError    [use a callback fucntion to return the error data]
         * @result: array[{
            temp: ,
            humidity: ,
            tempMin: ,
            tempMax: ,
            windSpeed: ,
            weatherID: ,
            date: ,
            city: 
        },...]}                 
         */
        weatherForecast: function(cityName , location , callbackFunction, callbackError ) {
            var result = [];
            var query = {};
            if (cityName != '') query = {
                q: cityName
            }
            else if (location != '') query = {
                lat: location.lat,
                lon: location.lon
            }
            res.weatherForecast(query, function(data) {
             $log.log(data);
                for (var i = 0; i < data.list.length; i++) {
                    result.push({
                        temp: data.list[i].temp.day,
                        humidity: data.list[i].humidity,
                        tempMin: data.list[i].temp.min,
                        tempMax: data.list[i].temp.max,
                        date: (data.list[i].dt * 1000),
                        windSpeed: data.list[i].speed,
                        weatherID: data.list[i].weather[0].id,
                        description:data.list[i].weather[0].description,
                        city: data.city.name,
                        country: data.city.country
                    });
                }
                callbackFunction(result);
            }, function(error) {
                callbackError(error);
            });
        }
    };
}]).
factory('ipService', ['$resource', function($resource) {
    var res = $resource('http://ip-api.com/json/');
    return {
        /**
         * uses ip-api to get current user location based on the its ip. 
         * @param  {function(data){...}} callbackFunction 
         * @param  {function(error){...}} callbackError   
         * @data :{
         *          country:  ,
                    countryCode: ,
                    isp:  ,
                    lat:  ,
                    lon:  ,
                    ip:  ,
                    region:  ,
                    city:  ,
                    timezone:  
         * }                   
         */
        getCurrentLocation: function(callbackFunction,callbackError ) {
            var result = {};
            res.get(function(data) {
                result = {
                    country: data.country,
                    countryCode: data.countryCode,
                    isp: data.isp,
                    lat: data.lat,
                    lon: data.lon,
                    ip: data.query,
                    region: data.region,
                    city: data.city,
                    timezone: data.timezone
                }
                callbackFunction(result);
            },function (error){
                callbackError(error)
            });
        }
    }
}]);