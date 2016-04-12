var weatherAppDirectives=angular.module('weatherAppDirectives',[]).directive('forecastPanel', function() {
    return {
        restrict: 'E',
        templateUrl: 'partials/forecast-panel.html',
        scope: {
            weatherInfo: '=weather',
            isItC: '=isC',
            active: '@'
        },
        controller: function($scope, weatherIcon, $log) {
            $scope.convert = function(c) {
                return ($scope.isItC) ? c : (c * 2 + 30);
            }
            $scope.weatherIcon = weatherIcon;
            // $log.log($scope.active);
        }
    }
}).directive('weatherPanel', function() {
    return {
        restrict: 'E',
        templateUrl: 'partials/weather-panel.html',
        scope: {
            weatherInfo: '=weather',
            isItC: '=isC'
        },
        controller: function($scope, weatherIcon, $log) {
            $scope.setToC = function() {
                $scope.isItC = true;
            }
            $scope.setToF = function() {
                $scope.isItC = false;
            }
            $scope.convert = function(c) {
                return ($scope.isItC) ? c : (c * 2 + 30);
            }
            $scope.weatherIcon = weatherIcon;
        }
    }
}).directive('searchForm', function($log) {
    return {
        restrict: 'E',
        templateUrl: 'partials/search-form.html',
        scope: {
            callback: '='
        },
        controller: function($scope, $log, apiService) {
            $scope.update = function() {
                $scope.callback($scope.city);
            }
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
                } else
                    for (var i = 0; i < place.address_components.length; i++) {
                        if (place.address_components[i].types[0] === 'locality') selectedCity = place.address_components[i].short_name;
                        else if (place.address_components[i].types[0] === 'country') selectedCountry = place.address_components[i].short_name;
                    }
                scope.city = selectedCity;
                scope.callback(selectedCity + ',' + selectedCountry);
            });
        }
    }
}).directive('imageFrame', function() {
    return {
        restrict: 'AE',
        scope: {
            imageSource: '@',
            dimension: '='
        },
        templateUrl: 'partials/image-frame.html',
        link: function(scope, element, attrs) {
            scope.$watchGroup(['dimension.width', 'dimension.height'], function() {
                scope.frameRatio = scope.dimension.width / scope.dimension.height;
                element.css({
                    width: scope.dimension.width,
                    height: scope.dimension.height
                });
            });
        }
    }
}).directive('adjustImage', function($log) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs, frameCtrl) {
            var newImg = new Image();
            scope.imgRatio = 0;
            newImg.onload = function() {
                scope.imgRatio = newImg.width / newImg.height;
                scope.$apply();
            }
            $log.log('image source:'+scope.imageSource);
            scope.$watch('imageSource',function(){
                if(scope.imageSource)
                    newImg.src = scope.imageSource;
            });
             
            scope.$watchGroup(['imgRatio', 'frameRatio'], function() {
                $log.log('im here: ' + scope.imgRatio + " " + scope.frameRatio);
                if (scope.imgRatio != 0) {
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
    }
}).directive('loadingPage', function(loadController,$log) {
    return {
        restrict: 'E',
        templateUrl: 'partials/loading-page.html',
        link: function(scope, element, attr) {
            
             
        }
    }
});