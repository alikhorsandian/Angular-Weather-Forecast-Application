"use strict";
var weatherAppFilters = angular.module('weatherAppFilters',[])
.filter('weatherIcon',function(){
	return function(weatherId){
		if (weatherId <= 232) return 'images/thunderstorm.png';
        else if (weatherId <= 531) return 'images/rain.png';
        else if (weatherId <= 622) return 'images/snow.png';
        else if (weatherId == 800) return 'images/clear.png';
        else if (weatherId <= 802) return 'images/partly cloudy.png';
        else if (weatherId <= 804) return 'images/cloudy.png';
	}
})
.filter('weatherWallpaper',function(){
	return function(weatherId){
		if (weatherId <= 232) return 'images/thunderstorm-wp.jpg';
        else if (weatherId <= 531) return 'images/rain-wp.jpg';
        else if (weatherId <= 622) return 'images/snow-wp.jpg';
        else if (weatherId == 800) return 'images/clear-wp.jpg';
        else if (weatherId <= 802) return 'images/partly cloudy-wp.jpg';
        else if (weatherId <= 804) return 'images/cloudy-wp.jpg';
	}
});