app.directive('contactCard', ["ContactsService", "ActiveContactService", function(ContactsService, ActiveContactService) {
    return {
        restrict: 'E', //E = element, A = attribute, C = class, M = comment
        scope: {
            namecontact: "=",
            phonenumber: "=",
            contactid: "="
        },
        templateUrl: 'app/directives/contact-card/contact-card.directive.html',
        link: function($scope, element, attrs) {
            //init card
            $scope.showUser = function(contactId) {

                //get the last active contact element and set disable mode
               document.getElementById(ActiveContactService.ActiveContact.id).className = "contact-card-div-no-active";
               console.log(ActiveContactService.ActiveContact.id);
               ActiveContactService.changeActiveContact(contactId,
               function(response){
                 document.getElementById(contactId).className = "contact-card-div-active";

               },
             function(response){
               console.log(response);
             });

            }
        }
    };
}]);
