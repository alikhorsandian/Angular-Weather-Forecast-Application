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
}]).factory('weatherIcon', function() {
    /**
     * gets the url for the weather condition icons.
     * @param  {[type:int]} picId  weather id defining the weather condition.
     * @return {type:string}       url for the image. 
     */ 
    function getIconAddress(picId) {
        //rain snow cloud thunderstorm clear
        if (picId <= 232) return 'img/thunderstorm.png';
        else if (picId <= 531) return 'img/rain.png';
        else if (picId <= 622) return 'img/snow.png';
        else if (picId == 800) return 'img/clear.png';
        else if (picId <= 802) return 'img/partly cloudy.png';
        else if (picId <= 804) return 'img/cloudy.png';
    }
    return getIconAddress;
}).factory('weatherWallpaper', function() {
    /**
     * gets a wallpaper based on weather id
     * @param  {[type:int]} picId weather-id defining the weather condition. 
     * @return {[type:string]}       image url for wallpaper. 
     */
    function getWallpaperAddress(picId) {
        if (picId <= 232) return 'img/thunderstorm-wp.jpg';
        else if (picId <= 531) return 'img/rain-wp.jpg';
        else if (picId <= 622) return 'img/snow-wp.jpg';
        else if (picId == 800) return 'img/clear-wp.jpg';
        else if (picId <= 802) return 'img/partly cloudy-wp.jpg';
        else if (picId <= 804) return 'img/cloudy-wp.jpg';
    }
    return getWallpaperAddress;
}).factory('loadController', function($log) {
    var modules = [];
    return {
        registerPending: function(name) {
            
            modules.push({
                name:name,
                status:'pending'
            });
        },
        setLoaded: function(name) {
            for (var i = 0; i < modules.length; i++) {
                if (modules[i].name === name) modules[i].status = 'loaded';
            }
        },
        status: function() {
            var notLoaded = [];
            var isReady = true;
            for (var i = 0; i < modules.length; i++) {
                if (modules[i].status != 'loaded') {
                    notLoaded.push(modules[i].name);
                    isReady = false;
                }
            }
            $log.log(modules);
            return {
                notloaded: notLoaded,
                isReady: isReady
            }
        },
        isLoaded:function(name){
            var result=false;
            for(var i=0;i<modules.length;i++){
                if(modules[i].name===name)
                    if(modules[i].status==='loaded')
                        result=true;
            }
            $log.log(modules);
            return result;

        }
    }
});