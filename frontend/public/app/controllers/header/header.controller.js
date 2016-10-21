app.controller('HeaderController', ['$scope', '$routeParams', '$location', 'ContactsService', "ActiveContactService", function($scope, $routeParams, $location, ContactsService, ActiveContactService) {

    $scope.location = $location;
    $scope.IsLoading = false;
    $scope.ActiveContactService = ActiveContactService;
    $scope.ContactsService = ContactsService;
    $scope.param = $routeParams.id;

    //Functions:-------------------------------------------------------

    $scope.inputSearch = function() {
        $scope.allowDelete = true;
        var textToSearch = $scope.inputText;
        $scope.IsLoading = true;

        if (textToSearch != "") {
            setTimeout(function() {
                ContactsService.GetAutocomplete(textToSearch, $scope.OnCompleteGetAll, $scope.OnErrorGetAll);
            }, 100);
        } else {
            $scope.allowDelete = false;
            $scope.IsLoading = true;

            setTimeout(function() {
                ContactsService.GetAll($scope.OnCompleteGetAll, $scope.OnErrorGetAll);

            }, 1000);
        }

    }
    $scope.deleteText = function() {
        $scope.noData = false;
        $scope.inputText = "";
        $scope.allowDelete = false;
        $scope.IsLoading = true;
        setTimeout(function() {
            ContactsService.GetAll($scope.OnCompleteGetAll, $scope.OnErrorGetAll);

        }, 1000);
    }

    //GetAll Callback Functions:------------------------------------------------------

    $scope.OnCompleteGetAll = function() {
        //update active user on active service
        if (ContactsService.AllItems.length != 0) {
            $scope.noData = false;
            $scope.ContactsList = ContactsService.AllItems;
            ActiveContactService.ActiveContact = ContactsService.AllItems[0];
            $scope.ActiveContact = ActiveContactService.ActiveContact;
            $scope.contact= ActiveContactService.ActiveContact;

            // setTimeout(function() {
                if (ActiveContactService.ActiveContact.id != null &&
                    document.getElementById(ActiveContactService.ActiveContact.id) != null) {
                    document.getElementById(ActiveContactService.ActiveContact.id).className = "contact-card-div-active";
                }
                //load first active user on header controller scope

            // }, 100);
            // ActiveContactService.setShowMode();
        } else {
            $scope.noData = true;
        }

        //stop loading animation
        $scope.IsLoading = false;

    }
    $scope.OnErrorGetAll = function(errorCode) {
        console.log(errorCode);
        $scope.IsLoading = false;
    }


    //Delete Function:------------------------------------------------------------------

    var DeleteOnComplete = function() {
        alert("The contact was successfully removed!");
        $scope.IsLoading = false;
        ContactsService.GetAll($scope.OnCompleteGetAll, $scope.OnErrorGetAll);
        //Redirect to show any card
        ActiveContactService.setShowMode();
    }

    var DeleteOnError = function() {
        alert("The contact was not sucessfully removed!");
        $scope.IsLoading = false;
    }

    $scope.Delete = function() {
        //Update Item
        $scope.IsLoading = true;
        ContactsService.RemoveById(ActiveContactService.ActiveContact, DeleteOnComplete , DeleteOnError);
    }

    //Save Function:------------------------------------------------------------------

    var SaveOnComplete = function() {
        alert("The contact was successfully saved!");
        $scope.IsLoading = false;
        var id = $routeParams.id;
        ContactsService.GetAll($scope.OnCompleteGetAll, $scope.OnErrorGetAll);
        //Redirect to show saved contact card
        ActiveContactService.setShowMode(id);
    }

    var SaveOnError = function() {
        alert("The contact was not sucessfully saved!");
        $scope.IsLoading = false;
    }

    $scope.Save = function() {
        //Update Item
        $scope.IsLoading = true;
        if($routeParams.id==null){
        ContactsService.CreateItem( SaveOnComplete , SaveOnError);
        } else {
        ContactsService.SaveItem(ActiveContactService.ActiveContact.id, SaveOnComplete , SaveOnError);
        }
    }

    //Start Function:-----------------------------------------------------------------

    $scope.Start = function() {
        //load Persons
        $scope.allowDelete = false;
        $scope.IsLoading = true;
      // setTimeout(function() {
            ContactsService.GetAll($scope.OnCompleteGetAll, $scope.OnErrorGetAll);
      //   }, 1000);
    };
    $scope.Start();


}]);
