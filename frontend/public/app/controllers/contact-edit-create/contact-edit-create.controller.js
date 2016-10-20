app.controller('ContactEditCreateController', ['$scope', '$routeParams', 'ContactsService', 'ActiveContactService', function($scope, $routeParams, ContactsService, ActiveContactService) {

    $scope.IsLoading = false;
    $scope.id='5805df0f4a0f0419c09e5893';

    $scope.OnCompleteGetAll = function() {
        $scope.ContactsList = ContactsService.AllItems;
        $scope.IsLoading = false;
    }

    $scope.OnErrorGetAll = function(errorCode) {
        console.log(errorCode);
        $scope.IsLoading = false;
    }
    //Start Function
    $scope.Start = function() {
        if ($routeParams.id != null) {
            //Edit mode
            $scope.$routeParams = $routeParams;
        } else {
            //Create mode
        }
        $scope.Start();
    }
}]);
