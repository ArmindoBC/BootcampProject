app.controller('ContactEditCreateController', ['$scope', '$routeParams', 'ContactsService', 'ActiveContactService', function($scope, $routeParams, ContactsService, ActiveContactService) {

    $scope.IsLoading = false;

    //Start Function: ----------------------------------------------------------
    $scope.Start = function() {
        //Setting mode to ensure correct header icons ng-if
        ActiveContactService.mode = "edit";
        if ($routeParams.id != null) {
            //Pointing $routeParams to $scope
            $scope.routeParams = $routeParams;
        } else {
            //Create mode
        }
    }
    $scope.Start();

    //Callbacks Functions: -----------------------------------------------------
    $scope.OnCompleteGetAll = function() {
        $scope.ContactsList = ContactsService.AllItems;
        $scope.IsLoading = false;
    }

    $scope.OnErrorGetAll = function(errorCode) {
        console.log(errorCode);
        $scope.IsLoading = false;
    }
}]);
