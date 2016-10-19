app.directive('inputTextArea', ["ContactsService", function(ContactsService) {
    return {
        restrict: 'E', //E = element, A = attribute, C = class, M = comment
        scope: {
            variable: "=",
            holder: "=",
            modeEdit: "="
        },
        templateUrl: 'app/directives/input-text-area/input-text-area.directive.html',
        link: function(scope, element, attrs) {
            console.log(scope.variable);
            console.log(scope.holder);
        }
    };
}]);
