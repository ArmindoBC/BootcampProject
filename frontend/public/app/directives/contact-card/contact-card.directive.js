app.directive('contactCard', ["ContactsService", '$location', "ActiveContactService", function(ContactsService, $location, ActiveContactService) {
    return {
        restrict: 'E', //E = element, A = attribute, C = class, M = comment
        scope: {
            namecontact: "=",
            phonenumber: "=",
            contactid: "=",
            contactObject: "="
        },
        templateUrl: 'app/directives/contact-card/contact-card.directive.html',
        link: function($scope, element, attrs) {
            //Start Function: --------------------------------------------------
            $scope.start = function() {

            }
            $scope.start();
            //Controller Functions: --------------------------------------------

            //Function for ng-click in contact-card. Redirecting contact-details to new user
            $scope.showUser = function(contactId) {

                //commented till here
                document.getElementById(ActiveContactService.ActiveContact.id).className = "contact-card-div-no-active";
                ActiveContactService.ActiveContact = null;
                $location.path('/details/' + contactId);
                ActiveContactService.changeActiveContact(contactId, function() {
                    //Completed
                    document.getElementById(contactId).className = "contact-card-div-active";

                    ActiveContactService.setShowMode();
                    //Loading is hidden when ActiveContact is different than null and that it's already done
                }, function(error) {
                    console.log(error);
                });

                //get the last active contact element and set disable mode
            }
        }
    };
}]);
