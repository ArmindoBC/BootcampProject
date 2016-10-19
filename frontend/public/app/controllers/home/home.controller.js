app.controller('HomeController', ['$scope', 'ContactsService', function($scope, ContactsService) {

        $scope.IsLoading = false;
        $scope.text = "welcome to home controller!!";

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
          

        };
        $scope.Start();

    }]);
