
app.controller('HeaderController', ['$scope', 'ContactsService', function($scope, ContactsService) {

    $scope.IsLoading = false;

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
        //load Persons
       $scope.IsLoading = true;
        setTimeout(function() {
            ContactsService.GetAll($scope.OnCompleteGetAll, $scope.OnErrorGetAll);
        }, 1000);

    };
    $scope.Start();

}]);
