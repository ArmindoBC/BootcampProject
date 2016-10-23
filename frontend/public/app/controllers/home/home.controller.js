app.controller('HomeController', ['$scope', '$routeParams', 'ContactsService', 'ActiveContactService', function($scope, $routeParams, ContactsService, ActiveContactService) {

    //Start Function:---------------------------
    $scope.Start = function() {
        $scope.ActiveContactService = ActiveContactService;
        $scope.IsLoading = false;
    }
    $scope.Start();

    //GetContactLists Async Functions: ---------

    //OnComplete callback
    $scope.OnCompleteGetAll = function() {
            $scope.ContactsList = ContactsService.AllItems;
            $scope.IsLoading = false;
        }
    //OnError callback
    $scope.OnErrorGetAll = function(errorCode) {
        console.log(errorCode);
        $scope.IsLoading = false;
    }
}]);
