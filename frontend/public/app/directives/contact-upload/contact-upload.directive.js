app.directive('contactUpload', ["ContactsService", function(ContactsService) {
  return {
    restrict: 'E', //E = element, A = attribute, C = class, M = comment
    scope: {
      contactid: "=",
    },
    templateUrl: 'app/directives/contact-upload/contact-upload.directive.html',
    link: function($scope, element, attrs) {
      //init card
      console.log("contact-upload");
    }
  };
}]);
