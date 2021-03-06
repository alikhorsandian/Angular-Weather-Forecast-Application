"use strict";
var weatherAppDirectives=angular.module('weatherAppDirectives',[]).directive('forecastPanel', function() {
    return {
        /*
        Shows small box with weather inforamtion 
         */

        restrict: 'E',
        templateUrl: 'views/forecast-panel.html',
        scope: {
            weatherInfo: '=weather',
            isItC: '=isC',
            active: '@'
        },
        controller: function($scope) {
            $scope.convert = function(c) {
                return ($scope.isItC) ? c : (c * 2 + 30);
            };
            
            // $log.log($scope.active);
        }
    };
}).directive('weatherInfo',function (){
    return {
        restrict: 'E',
        templateUrl: 'views/weather-info.html',
        require: '^weatherController'
    };
}).directive('loadingMessage',function (){
    return {
        restrict: 'E',
        templateUrl: 'views/loading-message.html',
        scope:{
            message: "@"
        }
    };
}).directive('weatherPanel', function() {
    return {
        /*
        Indicates weather information with more data
         */

        restrict: 'E',
        templateUrl: 'views/weather-panel.html',
        scope: {
            weatherInfo: '=weather',
            isItC: '=isC'
        },
        controller: function($scope) {
            $scope.setToC = function() {
                $scope.isItC = true;
            };
            $scope.setToF = function() {
                $scope.isItC = false;
            };
            $scope.convert = function(c) {
                return ($scope.isItC) ? c : (c * 2 + 30);
            };
            
        }
    };
}).directive('searchForm', function() {
    return {

        /*
        this directive uses google maps autocomplete apis to suggest cities. 
         */
        restrict: 'E',
        templateUrl: 'views/search-form.html',
        scope: {
            callback: '='
        },
        controller: function($scope) {
            $scope.update = function() {
                $scope.callback($scope.city);
            };
        },
        link: function(scope, element, attr) {
            var autocomplete = new google.maps.places.Autocomplete(element.find("input")[0]);
            autocomplete.setTypes(['(cities)']);
            autocomplete.addListener('place_changed', function() {
                var place = autocomplete.getPlace();
                var selectedCity = '';
                var selectedCountry = '';
                if (!place.geometry) {
                    selectedCity = scope.city;
                } else{
                    for (var i = 0; i < place.address_components.length; i++) {
                        if (place.address_components[i].types[0] === 'locality') {selectedCity = place.address_components[i].short_name;}
                        else if (place.address_components[i].types[0] === 'country') {selectedCountry = place.address_components[i].short_name;}
                    }}
                scope.city = selectedCity;
                scope.callback(selectedCity + ',' + selectedCountry);
            });
        }
    };
}).directive('imageFrame', function() {
    return {

        /*
        creates a frame to crop some part of the image. 
         */
        restrict: 'AE',
        scope: {
            imageSource: '@',
            dimension: '='
        },
        
        templateUrl: 'views/image-frame.html',
        link: function(scope, element, attrs) {
            scope.$watchGroup(['dimension.width', 'dimension.height'], function() {
                scope.frameRatio = scope.dimension.width / scope.dimension.height;
                element.css({
                    width: scope.dimension.width,
                    height: scope.dimension.height
                });
            });
        }
    };
}).directive('adjustImage', function($window) {
    return {
        /*
        gets origial image dimension. creates image ratio and compare it with its frame ratio to resize the image to fit perfectly in the
        frame with keeping the original image ratio. 
         */
        restrict: 'A',
        link: function(scope, element, attrs, frameCtrl) {
            
            scope.imgRatio = 0;

            //getting original image dimensions. 
            var newImg = new Image();
            newImg.onload = function() {
                scope.imgRatio = newImg.width / newImg.height;
                scope.$apply();
            };
            scope.$watch('imageSource',function(){
                if(scope.imageSource)
                    {newImg.src = scope.imageSource;}
            });
            ///end 
         
            
            //scaling the image to fit it into its frame (img-frame)
            scope.$watchGroup(['imgRatio', 'frameRatio'], function() {
                // $log.log('im here: ' + scope.imgRatio + " " + scope.frameRatio+' '+angular.element($window).width());
                if (scope.imgRatio !== 0) {
                    
                    if (scope.imgRatio < scope.frameRatio) {

                        element.css({
                            width: '100%',
                            height: 'auto'
                        });
                    } else {
                        element.css({
                            width: 'auto',
                            height: '100%'
                        });
                    }
                }
            });
        }
    };
});