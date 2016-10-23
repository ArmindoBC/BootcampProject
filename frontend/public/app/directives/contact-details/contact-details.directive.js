app.directive('contactDetails', ["ContactsService", "ActiveContactService", "$routeParams", function(ContactsService, ActiveContactService, $routeParams) {
    //Function Map initialize
    function initMap(addressMap, element) {
        var geocoder = new google.maps.Geocoder();
        var result;
        var map;
        var maker;
        geocoder.geocode({
            'address': addressMap
        }, function(results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
                var loc = results[0].geometry.location;
                if (loc) {
                    result = new google.maps.LatLng(loc.lat(), loc.lng());
                    if (result) {
                        if (element) {
                            map = new google.maps.Map(element, {
                                center: result,
                                zoom: 16
                            });
                            marker = new google.maps.Marker({
                                position: result,
                                map: map,
                                title: 'Home'
                            });
                            return result;
                        }
                    }
                }
            } else {
                result = "Unable to find address: " + status;
            }
            return (result);
        });
    }
    return {
        restrict: 'E', //E = element, A = attribute, C = class, M = comment
        scope: {
            contact: "=",
        },
        templateUrl: 'app/directives/contact-details/contact-details.directive.html',
        link: function($scope, element, attrs) {
            $scope.isOnMobile = $('.isOnMobile').is(':visible');
            //Start Function: --------------------------------------------------
            $scope.start = function() {
                // Pointing ContactsService to $scope
                $scope.ContactsService = ContactsService;
                //added
                if ($routeParams.id != null) {
                    setTimeout(function() {
                        ContactsService.GetById($routeParams.id, function(model) {
                            ContactsService.Model = model;
                            $scope.ContactsService = ContactsService;
                            if (ContactsService.Model.address != undefined && ContactsService.Model.address != null) {
                                initMap($scope.contact.address, $(element).find('.map')[0]);
                                $(element).find('.contact-form-container')[0].style.minHeight = "700px";
                            } else {
                                $(element).find('.contact-form-container')[0].style.minHeight = "100%";
                            }
                        }, function(error) {
                            console.log(error);
                        });
                    }, 100);
                    $scope.modeEdit = true;
                } else {
                    ContactsService.Model = ActiveContactService.ActiveContact;
                    $scope.modeEdit = false;
                    if (ActiveContactService.ActiveContact.address != undefined && ActiveContactService.ActiveContact.address != null) {
                        initMap(ActiveContactService.ActiveContact.address, $(element).find('.map')[0]);
                        $(element).find('.contact-form-container')[0].style.minHeight = "700px";
                    } else {
                        $(element).find('.contact-form-container')[0].style.minHeight = "100%";
                    }
                }
                $scope.$applyAsync();
            }
            $scope.start();
        }
    };
}]);
