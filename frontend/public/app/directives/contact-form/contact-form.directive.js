var app = angular.module('projectApp',[]);

//Configure routes
// app.config(function($routeProvider, $locationProvider) {
//
//     // $routeProvider
//     //     .when("/", {
//     //         controller: "HomeController",
//     //         templateUrl: "app/controllers/home/home.controller.html"
//     //     })
//     //     .otherwise({
//     //         redirectTo: "/"
//     //     });
//
//     // use the HTML5 History API
//     $locationProvider.html5Mode(true);
//
// });

app.controller('homeController', ['$scope', function($scope) {
    $scope.text = "ola";
}]);

app.directive("contactForm", [function() {
    return {
        restrict: 'E', //E = element, A = attribute, C = class, M = comment
        scope: {
            contactId: "="
        },
        templateUrl: 'app/directives/contact-form/contact-form.directive.html',
        link: function($scope, element, attrs) {
            // $scope.onComplete = function (complete, data) {
            //   if(complete) {
            //     // loading details into local memory
            //     $scope.model = data;
            //   } else {
            //     alert("Failed to complete person details loading")
            //   }
            // }
            // //init card
            // PersonsService.GetById($scope.personid, $scope.onComplete);
        }
    };
}]);
