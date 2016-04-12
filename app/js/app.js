var weatherApp = angular.module("weatherApp", ["ngRoute", "weatherAppServices"]);
weatherApp.config(function($routeProvider) {
    $routeProvider.when("/", {
        templateUrl: "view/main.html",
        controller: "weatherController"
    }).otherwise({
        redirectTo: "/"
    });
});