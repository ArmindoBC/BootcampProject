app.directive("inputBox", [ function() {
  return {
    restrict: 'E', //E = element, A = attribute, C = class, M = comment
    scope: {
      inputLabel: "="
    },
    templateUrl: 'app/directives/input-box/input-box.directive.html',
    link: function($scope, element, attrs) {
      // $scope.onComplete = function (complete, data) {
      //   if(complete) {
      //     // loading details into local memory
      //     $scope.model = data;
      //   } else {
      //     alert("Failed to complete person details loading")
      //   }
      // }
      // //init card
      // PersonsService.GetById($scope.personid, $scope.onComplete);
    }
  };
}]);
