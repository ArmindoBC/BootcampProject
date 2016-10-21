app.directive('contactCard', ["ContactsService", "ActiveContactService", function(ContactsService, ActiveContactService) {
    return {
        restrict: 'E', //E = element, A = attribute, C = class, M = comment
        scope: {
            namecontact: "=",
            phonenumber: "=",
            contactid: "=",
            contactObject: "="
        },
        templateUrl: 'app/directives/contact-card/contact-card.directive.html',
        link: function($scope, element, attrs) {
            //Start Function: --------------------------------------------------
            $scope.start = function() {

            }
            $scope.start();

            console.log($scope.contactObject);
            console.log($(element).find('.imgTeste')[0].style);

            if ($scope.contactObject.picture != undefined) {
                $(element).find('.imgTeste')[0].style.src = "url(./assets/photos/" + $scope.contactObject.picture + ")";
            } else {
                $(element).find('.imgTeste')[0].style.src = "url(./assets/photos/avatar5.png)";
            }
            //Controller Functions: --------------------------------------------

            //Function for ng-click in contact-card. Redirecting contact-details to new user
            $scope.showUser = function(contactId) {
                document.getElementById(ActiveContactService.ActiveContact.id).className = "contact-card-div-no-active";

                // this part was commented

                if ($(".sub-container-2").css("display") == "none") {
                    // your code here
                    $(".sub-container").css("display", "none");
                    $(".sub-container-2").css("display", "block");
                }

                $(window).resize(function(){
                    console.log($scope);
                    $(".sub-container").css("display", "block");

                });

                //commented till here

                ActiveContactService.ActiveContact = null;
                ActiveContactService.changeActiveContact(contactId, function() {
                    //Completed
                    document.getElementById(contactId).className = "contact-card-div-active";
                    ActiveContactService.setShowMode();
                    //Loading is hidden when ActiveContact is different than null and that it's already done
                }, function(error) {
                    console.log(error);
                });

                //get the last active contact element and set disable mode
            }
        }
    };
}]);
