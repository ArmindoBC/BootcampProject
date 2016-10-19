app.directive('contactDetails', ["ContactsService", function(ContactsService) {
  return {
    restrict: 'E', //E = element, A = attribute, C = class, M = comment
    scope: {
      contactid: "=",
    },
    templateUrl: 'app/directives/contact-details/contact-details.directive.html',
    link: function($scope, element, attrs) {
      //init card
      ContactsService.GetById($scope.contactid, function(model) {
          $scope.model = model;
      }, function(error) {
          console.log(error);
      });
      console.log($scope.model);
    }
  };
}]);
