var weatherAppControllers = angular.module('weatherAppControllers', []).
controller('weatherController', ['$scope', '$window', '$log', 'ipService', 'weatherWallpaper', 'loadController', 'weatherService', function($scope, $window, $log, ipService, weatherWallpaper, loadController, weatherService) {
    /*
    Uses ip-api(ipApi service) and openweathermap(apiService) to extract and maintain weather data based on users current location or searched cities. 
     */

     /*
     weather model
        {
            temp: ,
            humidity: ,
            tempMin: ,
            tempMax: ,
            windSpeed: ,
            weatherID: ,
            description:,
            date: ,
            city: ,
            country:
        }
      */
    $scope.registerPending();
    ipService.getCurrentLocation(function(result) {
        $scope.registerLoaded();
        $scope.setWeatherForLocation(result);
    }, function (error){
        //use error management to handle the error. 
    });
    /**
     * extract weather data from openweathermap api via apiService
     * @param location:{lat:latitude, lon:longitude}
     */
    $scope.setWeatherForLocation = function(location) {
        $scope.registerPending();
        weatherService.weatherForecast('', {
            lat: location.lat,
            lon: location.lon
        }, function(result) {
            $scope.forecast = result;
            $scope.setToday(0);
            $scope.registerLoaded();
        }, function(error) {
            $scope.registerError(error);
        });
    }
    /**
     * extract weather data from openweathermap api via apiService
     * @param city:cityname
     * 
     */
    $scope.setWeatherForCity = function(city) {
        $scope.registerPending();
        weatherService.weatherForecast(city, '', function(result) {
            $scope.forecast = result;
            $scope.setToday(0);
            $scope.registerLoaded();
        }, function(error) {
            $scope.registerError(error);
        });
    }


    $scope.selectedForecast = 0;
    $scope.setToday = function(index) {
        $scope.today = $scope.forecast[index];
        $scope.selectedForecast = index;
        $scope.weatherWallpaper = weatherWallpaper($scope.today.weatherID);
    }
    $scope.isItC = true;
    $scope.convertToC = function() {
        $scope.isItC = true;
    }
    $scope.convertToF = function() {
        $scope.isItC = false;
    }
    $scope.temp = function(c) {
        if ($scope.isItC) return c;
        else return (c * 2) + 30;
    }
}]).controller('page', ['$scope', '$log', '$window', function($scope, $log, $window) {
    /*
    this controller, manages the wallpaper image size by providing window dimension to image-frame via its (frameDimension) attribute.
    image frame directive will take care of scale and crop to fit the image perfectly in the background. 
     */

    $scope.forecastDimension = {}
    $scope.mainDimension = {}
    $scope.frameDimension = {}
    setFrameDimension();
    angular.element($window).on('resize', function() {
        setFrameDimension();
        $scope.$apply();
    });
    /**
     * updates window dimensions into frameDimension
     * frameDimension is used for image-frame directive
     */
    function setFrameDimension() {
         
            $scope.frameDimension.width = angular.element($window).width();
            $scope.frameDimension.height = angular.element($window).height();
        
    }
}]).controller('loading', ['$scope', 'loadController', '$log', function($scope, loadController, $log) {
    $scope.isReady = function() {
        return loadController.status().isReady;
    }
}]).controller('loadController', function($log, $scope) {
    
    var pendingModules=0;
    $scope.isLoading = false;

    $scope.Error = {
        status: false,
        message: ''
    }
    $scope.registerError = function(error) {
        $scope.Error = {
            status: true,
            message: 'Error: ' + error.data.cod + ' check weather API key'
        }
    }
    $scope.registerPending = function() {
        pendingModules++;
        $scope.isLoading = true;
        $log.log('pending: '+ pendingModules);
    }
    $scope.registerLoaded = function() {
         pendingModules--;
         if(pendingModules===0)
            $scope.isLoading=false;
        $log.log('pending: '+ pendingModules);
    }
   
     
});