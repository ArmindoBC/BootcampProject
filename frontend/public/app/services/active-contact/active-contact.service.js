app.service('ActiveContactService', ['ContactsService', function(ContactsService) {

    this.ActiveContact;
    this.Mode = "show";
    var thisService = this;


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

    this.setEditMode = function() {
        thisService.Mode = "edit";
    }

    this.setShowMode = function() {
        thisService.Mode = "show";
    }
    this.setCreateMode = function() {
        thisService.Mode = "create";
    }
}]);
