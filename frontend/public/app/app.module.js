var app = angular.module('contactsManager', ["ngRoute","ngAnimate", "ngSanitize", "ui.bootstrap"]);

//Configure routes
app.config(function($routeProvider, $locationProvider) {

    $routeProvider
        .when("/", {
            controller: "HomeController",
            templateUrl: "app/controllers/home/home.controller.html"
        })
        .when("/details/:id?", {
            controller: "ContactDetailsController",
            templateUrl: "app/controllers/contact-details/contact-details.controller.html"
        })
        .when("/edit/:id?", {
            controller: "ContactEditCreateController",
            templateUrl: "app/controllers/contact-edit-create/contact-edit-create.controller.html"
        })
        .otherwise({
            redirectTo: "/"
        });

    // use the HTML5 History API
    $locationProvider.html5Mode(true);

});
