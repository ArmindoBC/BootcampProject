app.controller('HeaderController', ['$scope', '$location', 'ContactsService', "ActiveContactService", function($scope, $location, ContactsService, ActiveContactService) {

    $scope.location = $location;
    $scope.IsLoading = false;


    $scope.OnCompleteGetAll = function() {

        //update active user on active service
        if (ContactsService.AllItems.length !=0) {
            $scope.noData = false;
            $scope.ContactsList = ContactsService.AllItems;

            ActiveContactService.ActiveContact = ContactsService.AllItems[0];

            setTimeout(function() {
                if (ActiveContactService.ActiveContact.id != null &&
                    document.getElementById(ActiveContactService.ActiveContact.id) != null) {
                    document.getElementById(ActiveContactService.ActiveContact.id).className = "contact-card-div-active";
                }
                //load first active user on header controller scope
                $scope.ActiveContact = ActiveContactService.ActiveContact;
            }, 100);
        } else {
            $scope.noData = true;
        }

        //stop loading animation
        $scope.IsLoading = false;
    }

    $scope.inputSearch = function() {
        $scope.allowDelete =true;
        var textToSearch = $scope.inputText;
        if (textToSearch != "") {
            setTimeout(function() {
                ContactsService.GetAutocomplete(textToSearch, $scope.OnCompleteGetAll, $scope.OnErrorGetAll);
            }, 100);
        } else {

            setTimeout(function() {
                ContactsService.GetAll($scope.OnCompleteGetAll, $scope.OnErrorGetAll);

            }, 1000);
        }

    }
    $scope.deleteText =  function(){
      $scope.noData = false;
      $scope.inputText = "";
      $scope.allowDelete =false;
      $scope.IsLoading = true;
      setTimeout(function() {
          ContactsService.GetAll($scope.OnCompleteGetAll, $scope.OnErrorGetAll);

      }, 1000);
    }
    $scope.OnErrorGetAll = function(errorCode) {
        console.log(errorCode);
        $scope.IsLoading = false;
    }

    //Start Function
    $scope.Start = function() {
        //load Persons
        $scope.allowDelete =false;
        $scope.IsLoading = true;
        setTimeout(function() {
            ContactsService.GetAll($scope.OnCompleteGetAll, $scope.OnErrorGetAll);

        }, 1000);

    };
    $scope.Start();

}]);
