app.service('ActiveContactService', ['$location', 'ContactsService', function($location, ContactsService) {

    this.ActiveContact;
    this.mode = "show";
    var thisService = this;

    this.setEditMode = function() {
        this.mode = "edit";
        $location.path('/edit/' + this.ActiveContact.id);
    }

    this.setShowMode = function() {
        this.mode = "show";
        $location.path('/details/' + this.ActiveContact.id);
    }

    this.changeActiveContact = function(contactId, onComplete, onError) {
        ContactsService.GetById(contactId,
            function(response) {
                thisService.ActiveContact = response;
                onComplete;
            },
            function(onError) {
                console.log(onError);
                onError(onError);
            });
    }

}]);
