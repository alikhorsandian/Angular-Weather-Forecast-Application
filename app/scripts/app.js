var weatherApp = angular.module("weatherApp", ["ngRoute", "weatherAppServices", "weatherAppDirectives", "weatherAppControllers","weatherAppFilters"]);
weatherApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when("/", {
        templateUrl: "views/main.html",
        controller: "weatherController"
    }).otherwise({
        redirectTo: "/"
    });
}]);