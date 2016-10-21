app.directive('contactForm', ["ContactsService", "$routeParams", function(ContactsService, $routeParams) {
    return {
        restrict: 'E', //E = element, A = attribute, C = class, M = comment
        scope: {
            contactid: "="
        },
        templateUrl: 'app/directives/contact-form/contact-form.directive.html',
        link: function($scope, element, attrs) {

            // Initialization functions: -----------------------------

            // Pointing ContactsService to scope
            $scope.ContactsService = ContactsService;

            // Initializing model according to contact id
            if ($routeParams.id != null) {
                ContactsService.GetById($routeParams.id, function(model) {
                    ContactsService.Model = model;
                    $scope.ContactsService = ContactsService;
                    if ($scope.contact != null && $scope.contact.picture != undefined) {
                        $(element).find('.circle-image')[0].style.backgroundImage = "url(./assets/photos/" + $scope.contact.picture + ")";
                    } else {
                        $(element).find('.circle-image')[0].style.backgroundImage = "url(./assets/photos/avatar5.png)";
                    }
                    console.log(ContactsService.Model);
                }, function(error) {
                    // console.log(error);
                });
                $scope.modeEdit = true;
            } else {
                ContactsService.Model = null;
                $scope.modeEdit = false;

            }

            // DatePicker functions: --------------------------------

            $scope.today = function() {
                $scope.dt = new Date();
            };
            $scope.today();

            $scope.clear = function() {
                $scope.dt = null;
            };

            $scope.inlineOptions = {
                customClass: getDayClass,
                minDate: new Date(),
                showWeeks: true
            };

            $scope.dateOptions = {
                dateDisabled: disabled,
                formatYear: 'yy',
                maxDate: new Date(),
                minDate: new Date(1900, 1, 1),
                startingDay: -1
            };

            // Disable weekend selection
            function disabled(data) {
                var date = data.date,
                    mode = data.mode;
                return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
            }

            $scope.toggleMin = function() {
                $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
                $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
            };

            $scope.toggleMin();

            $scope.open1 = function() {
                $scope.popup1.opened = true;
            };

            $scope.open2 = function() {
                document.getElementById('openPicture').click();
                $scope.popup2.opened = true;
            };

            $scope.setDate = function(year, month, day) {
                $scope.dt = new Date(year, month, day);
            };

            $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
            $scope.format = $scope.formats[0];
            $scope.altInputFormats = ['M!/d!/yyyy'];

            $scope.popup1 = {
                opened: false
            };

            $scope.popup2 = {
                opened: false
            };

            var tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            var afterTomorrow = new Date();
            afterTomorrow.setDate(tomorrow.getDate() + 1);
            $scope.events = [{
                date: tomorrow,
                status: 'full'
            }, {
                date: afterTomorrow,
                status: 'partially'
            }];

            function getDayClass(data) {
                var date = data.date,
                    mode = data.mode;
                if (mode === 'day') {
                    var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

                    for (var i = 0; i < $scope.events.length; i++) {
                        var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

                        if (dayToCheck === currentDay) {
                            return $scope.events[i].status;
                        }
                    }
                }
                return '';
            }

            //init card
        }
    };
}]);
