var app = angular.module('contactsManager', ["ngRoute", "ngFileUpload", "ngSanitize", "ui.bootstrap"]);

//Configure routes
app.config(function($routeProvider, $locationProvider) {

    $routeProvider
        .when("/", {
            controller: "HomeController",
            templateUrl: "app/controllers/home/home.controller.html"
        })
        .when("/details/:id?", {
            controller: "ContactShowController",
            templateUrl: "app/controllers/contact-show/contact-show.controller.html"
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
