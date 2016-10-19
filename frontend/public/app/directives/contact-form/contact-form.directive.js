app.directive('contactForm', ["ContactsService", function(ContactsService) {
    return {
        restrict: 'E', //E = element, A = attribute, C = class, M = comment
        scope: {
            contactid: "="
        },
        templateUrl: 'app/directives/contact-form/contact-form.directive.html',
        link: function($scope, element, attrs) {
            $scope.ContactsService = ContactsService;
            // (delt) console.log($scope.contactid !=null);
            if ($scope.contactid != null) {
                ContactsService.GetById($scope.contactid, function(model) {
                    ContactsService.Model = model;
                    console.log(ContactsService.Model);
                }, function(error) {
                    console.log(error);
                });
                $scope.modeEdit = true;
                // (delt) console.log($scope.modeEdit);
            } else {
                ContactsService.Model = null;
                // ContactsService.Model = ContactsService.ModelCreate;
                $scope.modeEdit = false;
            }

            $scope.SaveOnComplete = function() {
          		alert("Guardado!");
          		$scope.IsLoading = false;
          		//Redirect to list
          		// $location.path("/persons");
          	}

          	$scope.SaveOnError = function() {
          		alert("Falhou!");
          		$scope.IsLoading = false;
          	}

            $scope.Save = function() {
              //Update Item
              $scope.IsLoading = true;
              ContactsService.SaveItem($scope.ContactsService.Model, $scope.SaveOnComplete, $scope.SaveOnError);

              //Redirect to list
              // $location.path("/persons");
            }

            //init card


        }
    };
}]);
