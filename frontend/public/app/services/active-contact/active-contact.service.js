app.service('ActiveContactService', ['ContactsService', function(ContactsService) {

    this.ActiveContact;
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

}]);
