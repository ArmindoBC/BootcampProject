app.directive('contactCard', ["ContactsService","ActiveContactService", function(ContactsService, ActiveContactService) {
  return {
    restrict: 'E', //E = element, A = attribute, C = class, M = comment
    scope: {
      namecontact: "=",
      phonenumber:  "=",
      contactid: "="
    },
    templateUrl: 'app/directives/contact-card/contact-card.directive.html',
    link: function($scope, element, attrs) {
      //init card
      $scope.showUser = function(contactId){
        ActiveContactService.changeActiveContact(contactId, function(){

        });

      }
    }
  };
}]);
