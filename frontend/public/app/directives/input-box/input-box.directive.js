app.directive('inputBox', ["ContactsService", function(ContactsService) {
    return {
        restrict: 'E', //E = element, A = attribute, C = class, M = comment
        scope: {
            variable: "=",
            holder: "=",
            modeEdit: "=",
            inputType: "=",
            inputRequired: "="
        },
        templateUrl: 'app/directives/input-box/input-box.directive.html',
        link: function($scope, element, attrs) {
            console.log($scope.variable);
            console.log($scope.holder);
            $scope.$watch('$scope.variable', function(newValue, oldValue) {
                console.log(newValue);
                console.log(oldValue);
            });

        }
    };
}]);
