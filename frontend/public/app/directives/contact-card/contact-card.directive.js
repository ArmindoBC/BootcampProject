app.directive('contactCard', ["ContactsService", '$location', "ActiveContactService", function(ContactsService, $location, ActiveContactService) {
    return {
        restrict: 'E', //E = element, A = attribute, C = class, M = comment
        scope: {
            namecontact: "=",
            phonenumber: "=",
            contactid: "=",
            contactObject: "=",
            isMobile: "="
        },
        templateUrl: 'app/directives/contact-card/contact-card.directive.html',
        link: function($scope, element, attrs) {
            //Start Function: --------------------------------------------------
            $scope.start = function() {



            }
            $scope.start();
            //Controller Functions: --------------------------------------------

            //Function for ng-click in contact-card. Redirecting contact-details to new user

            $scope.showUserDesktop = function(contactId) {
                //get the last active contact element and set disable mode
                $('#' + ActiveContactService.ActiveContact.id).removeClass('contact-card-div-active');
                //commented till here
                ActiveContactService.ActiveContact = null;

                ActiveContactService.changeActiveContact(contactId, function() {
                    //Completed
                    $(element).find(".contact-card-div").addClass('contact-card-div-active');

                    ActiveContactService.setShowMode();
                    //Loading is hidden when ActiveContact is different than null and that it's already done

                    $location.path('/details/' + contactId);
                }, function(error) {
                    console.log(error);
                });
            }

            $scope.showUserMobile = function(contactId) {
              ActiveContactService.ActiveContact = null;

              ActiveContactService.changeActiveContact(contactId, function() {
                  //Completed
              
                  $('.sub-container-2').show();
                  $('.labelMobile').show();
                  $('.header-name-mobile').show();

                  $('.header-title').hide();
                  $('.sub-container').hide();
                  ActiveContactService.setShowMode();
                  //Loading is hidden when ActiveContact is different than null and that it's already done

              }, function(error) {
                  console.log(error);
              });
            }


            $scope.showUser = function(contactId) {

                if ($scope.isMobile) {
                  $scope.showUserMobile(contactId);
                }
                else {
                    $scope.showUserDesktop(contactId);
                }


            }

        }
    };
}]);
