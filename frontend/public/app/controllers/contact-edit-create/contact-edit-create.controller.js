app.controller('ContactEditCreateController', ['$scope', '$routeParams', 'ContactsService', 'ActiveContactService', function($scope, $routeParams, ContactsService, ActiveContactService) {

    $scope.IsLoading = false;
    console.log($routeParams.id);

    //Start Function: ----------------------------------------------------------
    $scope.Start = function() {
        //Setting mode to ensure correct header icons ng-if
        ActiveContactService.mode = "edit";
        if ($routeParams.id != null) {
            console.log($routeParams.id);
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
