app.directive('contactForm', ["ContactsService", function(ContactsService) {
    return {
        restrict: 'E', //E = element, A = attribute, C = class, M = comment
        scope: {
            contactid: "="
        },
        templateUrl: 'app/directives/contact-form/contact-form.directive.html',
        link: function($scope, element, attrs) {
            $scope.ContactsService = ContactsService;
            if (contactid != null) {
                $scope.ModeEdit = true;
            } else {
                $scope.ModeEdit = false;
            }

            //init card
            ContactsService.GetById($scope.contactid, function(model) {
                ContactsService.Model = model;
            }, function(error) {
                console.log(error);
            });
            console.log($scope.model);
        }
    };
}]);
