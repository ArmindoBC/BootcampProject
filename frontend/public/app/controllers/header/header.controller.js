app.controller('HeaderController', ['$scope', '$location', 'ContactsService', "ActiveContactService",function($scope, $location, ContactsService, ActiveContactService) {

    $scope.location = $location;
    $scope.IsLoading = false;


    $scope.OnCompleteGetAll = function() {

        $scope.ContactsList = ContactsService.AllItems;
        //update active user on active service
        ActiveContactService.ActiveContact.value =  ContactsService.AllItems[0];
        //load first active user on header controller scope
        $scope.ActiveContact =  ActiveContactService.ActiveContact;
        //stop loading animation
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
