var app = angular.module('contactsManager', ["ngRoute","ngAnimate", "ngSanitize", "ui.bootstrap"]);

//Configure routes
app.config(function($routeProvider, $locationProvider) {

    $routeProvider
        .when("/", {
            controller: "HomeController",
            templateUrl: "app/controllers/home/home.controller.html"
        })
        .when("/contacts", {
            controller: "ContactsListController",
            templateUrl: "app/controllers/contacts-list/contacts-list.controller.html"
        })
        .otherwise({
            redirectTo: "/"
        });

    // use the HTML5 History API
    $locationProvider.html5Mode(true);

});
