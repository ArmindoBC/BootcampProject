app.directive('contactUploadPhoto', ["ContactsService", function(ContactsService) {
  return {
    restrict: 'E', //E = element, A = attribute, C = class, M = comment
    scope: {
      contacid: "=",
    },
    templateUrl: 'app/directives/contact-upload-photo/contact-upload-photo.directive.html',
    link: function($scope, element, attrs) {
      //init card
      console.log("contact-upload-photo");
    }
  };
}]);
