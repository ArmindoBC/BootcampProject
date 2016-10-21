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
            if (status == google.maps.GeocoderStatus.OK) {
                var loc = results[0].geometry.location;
                result = new google.maps.LatLng(loc.lat(), loc.lng());
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

            //Start Function: --------------------------------------------------
            $scope.start = function() {
                // Pointing ContactsService to $scope
                $scope.ContactsService = ContactsService;
                //added
                console.log($scope.contact.id);
                console.log("ENTREI");
                    if ($scope.contact.id != null) {
                        ContactsService.GetById($scope.contact.id, function(model) {
                            ContactsService.Model = model;
                            $scope.ContactsService = ContactsService;

                            console.log(ContactsService.Model);
                        }, function(error) {
                            // console.log(error);
                        });
                        $scope.modeEdit = true;
                    } else {
                        ContactsService.Model = null;
                        $scope.modeEdit = false;
                    }

                console.log($(element).find('.circle-image')[0].style);
                if ($scope.contact.picture != undefined) {
                    $(element).find('.circle-image')[0].style.backgroundImage = "url(./assets/photos/" + $scope.contact.picture + ")";
                } else {
                    $(element).find('.circle-image')[0].style.backgroundImage = "url(./assets/photos/avatar5.png)";
                }
                console.log($(element).find('.circle-image')[0].style);
                if ($scope.contact.address != undefined) {
                    initMap($scope.contact.address, $(element).find('.map')[0]);
                } else {
                    $(element).find('.map')[0].style.display = 'none';
                }
                $scope.$applyAsync();
            }
            $scope.start();




        }
    };
}]);
