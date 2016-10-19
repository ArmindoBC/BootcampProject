app.directive('contactCard', ["ContactsService","ActiveContactService", function(ContactsService, ActiveContactService) {
  return {
    restrict: 'E', //E = element, A = attribute, C = class, M = comment
    scope: {
      namecontact: "=",
      phonenumber:  "=",
      contactid: "=",
      contactObject:"="
    },
    templateUrl: 'app/directives/contact-card/contact-card.directive.html',
    link: function($scope, element, attrs) {
      //init card
      $scope.showUser = function(contactId){
        ActiveContactService.ActiveContact = null;
        ActiveContactService.changeActiveContact(contactId, function(){
          //Completed
          //Loading is hidden when ActiveContact is different than null and that it's already done
        }, function(error) {
          console.log(error);
        });

      }
    }
  };
}]);
