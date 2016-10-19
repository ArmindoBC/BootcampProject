app.controller('HomeController', ['$scope', 'ContactsService', "ActiveContactService", function($scope, ContactsService, ActiveContactService) {

    $scope.IsLoading = false;

    $scope.ActiveContact = ActiveContactService.ActiveContact;

    $scope.$watch(ActiveContactService.ActiveContact, function(newActiveContact) {

          alert("entreiiieieiei");
          $scope.ActiveContact = newActiveContact;
    });

    $scope.OnCompleteGetAll = function() {
        $scope.ContactsList = ContactsService.AllItems;
        $scope.IsLoading = false;
    }

    $scope.OnErrorGetAll = function(errorCode) {
        console.log(errorCode);
        $scope.IsLoading = false;
    }

    //refresh service when clicking the user


    //Start Function
    $scope.Start = function() {
        //load Persons
        /*  $scope.IsLoading = true;
          setTimeout(function() {
              ContactsService.GetAll($scope.OnCompleteGetAll, $scope.OnErrorGetAll);
          }, 1000);*/

    };
    $scope.Start();

}]);
