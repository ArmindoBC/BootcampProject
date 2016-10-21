app.controller('ContactShowController', ['$scope', '$routeParams', 'ActiveContactService', function($scope, $routeParams, ActiveContactService) {
    $scope.IsLoading = false;

    //Start Function: -----------------------------------
    $scope.Start = function() {
        ActiveContactService.mode = "show";
        $scope.ActiveContactService = ActiveContactService;
    }
    $scope.Start();

    //Callback Functions: -------------------------------
    $scope.OnCompleteGetAll = function() {
        $scope.ContactsList = ContactsService.AllItems;
        $scope.IsLoading = false;
    }

    $scope.OnErrorGetAll = function(errorCode) {
            console.log(errorCode);
            $scope.IsLoading = false;
        }


}]);
