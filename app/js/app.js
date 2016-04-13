var weatherApp = angular.module("weatherApp", ["ngRoute", "weatherAppServices", "weatherAppDirectives", "weatherAppControllers"]);
weatherApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when("/", {
        templateUrl: "view/main.html",
        controller: "weatherController"
    }).otherwise({
        redirectTo: "/"
    });
}]);