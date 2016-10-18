app.directive('contactCard', ["ContactsService", function(ContactsService) {
  return {
    restrict: 'E', //E = element, A = attribute, C = class, M = comment
    scope: {
      namecontact: "=",
      phonenumber:  "="
    },
    templateUrl: 'app/directives/contact-card/contact-card.directive.html',
    link: function($scope, element, attrs) {
      //init card

    }
  };
}]);
