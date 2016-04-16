var weatherAppFilters = angular.module('weatherAppFilters',[])
.filter('weatherIcon',function(){
	return function(weatherId){
		if (weatherId <= 232) return 'img/thunderstorm.png';
        else if (weatherId <= 531) return 'img/rain.png';
        else if (weatherId <= 622) return 'img/snow.png';
        else if (weatherId == 800) return 'img/clear.png';
        else if (weatherId <= 802) return 'img/partly cloudy.png';
        else if (weatherId <= 804) return 'img/cloudy.png';
	}
})
.filter('weatherWallpaper',function(){
	return function(weatherId){
		if (weatherId <= 232) return 'img/thunderstorm-wp.jpg';
        else if (weatherId <= 531) return 'img/rain-wp.jpg';
        else if (weatherId <= 622) return 'img/snow-wp.jpg';
        else if (weatherId == 800) return 'img/clear-wp.jpg';
        else if (weatherId <= 802) return 'img/partly cloudy-wp.jpg';
        else if (weatherId <= 804) return 'img/cloudy-wp.jpg';
	}
});