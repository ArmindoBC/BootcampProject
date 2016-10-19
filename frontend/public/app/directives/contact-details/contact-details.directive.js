app.directive('contactDetails', ["ContactsService", "ActiveContactService", function(ContactsService, ActiveContactService) {
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
        link: function(scope, element, attrs) {
            console.log(scope.contact.address);
            //init card
            initMap(scope.contact.address, $(element).find('.map')[0]);

        }
    };
}]);
