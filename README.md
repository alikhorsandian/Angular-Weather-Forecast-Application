## Weather Forecast  
Sample weather forecast web application built with AngularJS 1.5.

![mainview](https://github.com/alikhorsandian/weatherForecast/blob/master/doc/img/mainview.png)

### Contents:
* [Getting Started](#getting-started)
* [Demo](#demo)
* [Employed APIs](#employed-apis)
* [Getting Started](#getting-started)
* [Code Modules](#code-modules)
  * [Controllers](#controllers)
  * [Directives](#directives)
  * [Services](#services)
  * [Filters](#filters)
* [Contribute](#contribute)


### Demo
Click [here](http://readmoreabout.me/weatherappdist) to try out the demo.
### Employed APIs:  
* [OpenWeatherMap](http://openweathermap.org) to get weather data.
* [ip-api](http://ip-api.com) to access user geolocation information (the weather for user's current location)
* [Google maps javascript api](https://developers.google.com/maps/documentation/javascript/examples/places-autocomplete)  

### Getting Started
1. install node, npm, grunt and git
2. run the following code on terminal
```
$ git clone https://github.com/alikhorsandian/Angular-Weather-Forecast-Application.git
$ grunt serve
```
To concatenate and minify css and js files for distribution use
```
$ grunt serve:dist
```
<ol start="3">
  <li>Http-Server is created using puer. Puer opens a page on your default browser.</li>
  <li>In the opened tab, navigate to the app folder and select index.html</li>
</ol>
### Code Modules
#### Controllers
* weatherController: It controls the weather model inside the main view. 
* page: Gets the page dimension from $window. The page dimension is used by image-frame to fill the entire page background with its image. 
* loadController: Manages API loading process and shows the loading page during any client-server communication. 

#### Directives
* search-form: Has Google Maps API bind to it. It is an autocomplete input suggesting cities. 
* weather-panel: Present weather information in detail.
* image-frame: Scale and crop image to properly fit into a given frame dimension. It maintains the original width/height ratio of the image.
* forecast-panel: outlines weather information.

#### Services
* weatherService: It queries the weather data from open weather map API using ngResource. The service convert open weather map data model to an object called **weatherForecastModel** with the following fields:

  |Properties|Description|
  |----------|-----------|
  |temp|Weather temperature (metric system)|
  |humidity|Weather humidity|
  |tempMin|Minimum temperature|
  |tempMax|Maximum temperature|
  |date|Date in Unix format|
  |description|Weather condition description|
  |windSpeed|Wind speed in km/h|
  |weatherID|Indicating weather condition|
  |city|City name|
  |country|Country name|

  The weatherService returns an object with the following functions
    * currentWeather, returns a **weatherForecastModel** for current weather situation.
    * weatherForecast, returns an array of **weatherForecastModel** for coming 6 days.  
    Both of the above functions receive the following inputs:
    
    |Properties|Description|
    |----------|-----------|
    |cityName|The city name in string format|
    |location|An object with Latitude and Longitude fields|
    |callbackfunction|The **weatherForecastModel** is passed through this function|
    |callbackerror|Passes error object through its input|
    
* ipService: It queries the user geolocation data from [ip-api](ip-api.com). The result is passed through its function called `getCurrentLocation(callbackfunction,callbackerror)` in the following format:
  
  |Properties|Description|
  |----------|-----------|
  |country|Country name|
  |countryCode|International country code|
  |isp|Internet Service Provider's name|
  |lat|Latitude|
  |lon|Longitude|
  |ip|User's IP|
  |region|User's region|
  |city|City name|
  |timezone|User's timezone|

#### Filters
The following filters map weatherID into proper wallpaper and icon urls to visualize weather condition.
* weatherWallpaper
* weatherIcon

Here is an example of weatherWallpaper filter:
`<img ng-src="{{weatherID | weatherWallpaper}}>"`

### Contribute
Ideas and suggestions are welcome. 




  
    



