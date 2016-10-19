app.service('ActiveContactService', ['ContactsService', function(ContactsService) {

    this.ActiveContact = {value:null} ;
    var thisService = this;

    this.changeActiveContact = function(contactId, onComplete){
      ContactsService.GetById(contactId,
         function(onSuccess)
      {
        thisService.ActiveContact.value =  onSuccess;
        onComplete();
      },
       function(onError){
        console.log(onError);
      });

    }

 }]);
