app.directive('contactMap', ["ContactsService","ActiveContactService", function(ContactsService,ActiveContactService) {

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
            contactid: "="
        },
        templateUrl: 'app/directives/contact-map/contact-map.directive.html',
        link: function($scope, element, attrs) {
            //init card
            console.log(ActiveContactService.ActiveContact.id);
            ContactsService.GetById(ActiveContactService.ActiveContact.id, function(model) {
                $scope.model = model;
                if($scope.model.address!="")
                    initMap(model.address, $(element).find('.map')[0]);
            }, function(error) {
                console.log(error);
            });


        }
    };
}]);
