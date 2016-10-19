app.directive('contactCard', ["ContactsService", "ActiveContactService", function(ContactsService, ActiveContactService) {
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
            //init card
            $scope.showUser = function(contactId) {

                document.getElementById(ActiveContactService.ActiveContact.id).className = "contact-card-div-no-active";

                ActiveContactService.ActiveContact = null;
                ActiveContactService.changeActiveContact(contactId, function(){
                  //Completed
                   document.getElementById(contactId).className = "contact-card-div-active";
                  //Loading is hidden when ActiveContact is different than null and that it's already done
                }, function(error) {
                  console.log(error);
                });

                //get the last active contact element and set disable mode
            }
        }
    };
}]);
