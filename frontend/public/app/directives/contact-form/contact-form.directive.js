app.directive('contactForm', ["ContactsService", function(ContactsService) {
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
            if ($scope.contactid != null) {
                ContactsService.GetById($scope.contactid, function(model) {
                    ContactsService.Model = model;
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
                maxDate: new Date(2020, 5, 22),
                minDate: new Date(),
                startingDay: 1
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
