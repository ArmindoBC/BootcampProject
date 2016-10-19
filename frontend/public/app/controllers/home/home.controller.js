app.controller('HomeController', ['$scope', '$routeParams', 'ContactsService', 'ActiveContactService', function($scope, $routeParams, ContactsService, ActiveContactService) {

    $scope.InEditMode = false;
    $scope.InDetailsMode = false;
    $scope.IsLoading = false;
    $scope.text = "welcome to home controller!!";

    $scope.ActiveContactService = ActiveContactService;

    //console.log(ActiveContactService.ActiveContact);
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
            //Create mode
            $scope.InEditMode = true;
            $scope.InDetailsMode = true;
            //$scope.model = ContactsService.GetById($routeParams.id);
        } else {
            //Edit mode
            $scope.InEditMode = false;
            $scope.InDetailsMode = false;
            $scope.model = new Contact();
        }
        $scope.Start();
        $scope.InDetailsMode = false;
    }
}]);
