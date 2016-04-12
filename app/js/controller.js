 angular.module('weatherApp').
 controller('weatherController', ['$scope', '$window', '$log', 'ipApi', 'weatherWallpaper', 'loadController', 'apiService', function($scope, $window, $log, ipApi, weatherWallpaper, loadController, apiService) {
     ipApi.getCurrentLocation(function(result) {
         $scope.setWeatherForLocation(result);
     });
     $scope.setWeatherForLocation = function(location) {
         $scope.registerPending('setWeatherForLocation');
         apiService.queryForecast('', {
             lat: location.lat,
             lon: location.lon
         }, function(result) {
             $scope.forecast = result;
             $scope.setToday(0);
              $scope.setLoaded('setWeatherForLocation');
         },function (error){
            $scope.registerError(error);
         });
     }
     $scope.setWeatherForCity = function(city) {
          $scope.registerPending('setWeatherForCity')
         apiService.queryForecast(city, '', function(result) {
             $scope.forecast = result;
             $scope.setToday(0);
              $scope.setLoaded('setWeatherForCity');
         },function (error){
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
     $scope.forecastDimension = {}
     $scope.mainDimension = {}
     $scope.frameDimension = {}
     setFrameDimension();
     angular.element($window).on('resize', function() {
         setFrameDimension();
         $scope.$apply();
     });

     function setFrameDimension() {
         $scope.frameDimension.width = angular.element($window).width();
         $scope.frameDimension.height = angular.element($window).height() - 300;
     }
 }]).controller('loading', ['$scope', 'loadController', '$log', function($scope, loadController, $log) {
     $scope.isReady = function() {
         return loadController.status().isReady;
     }
 }]).controller('loadController', function($log,$scope) {
     var modules = [];
     $scope.isLoading=true;
     $scope.Error={
        status:false,
        message:''
    }


     $scope.registerError= function (error){
        $scope.Error={
            status:true,
            message:'Error: '+error.data.cod+' check weather API key'
        }
     }
     $scope.registerPending = function(name) {
         modules.push({
             name: name,
             status: 'pending'
         });
         $scope.isLoading=true;
     }
     $scope.setLoaded = function(name) {
         for (var i = 0; i < modules.length; i++) {
             if (modules[i].name === name) modules[i].status = 'loaded';
         }

         $scope.isLoading=!$scope.status().isReady;
     }

     $scope.status = function() {
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
     }
     $scope.isModuleLoaded = function(name) {
         var result = false;
         for (var i = 0; i < modules.length; i++) {
             if (modules[i].name === name)
                 if (modules[i].status === 'loaded') result = true;
         }
         $log.log(modules);
         return result;
     }
 });