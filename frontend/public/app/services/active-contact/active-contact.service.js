app.service('ActiveContactService', ['ContactsService', function(ContactsService) {

    this.ActiveContact = {value:null} ;
    var thisService = this;

    this.changeActiveContact = function(contactId){
      ContactsService.GetById(contactId,
         function(onSuccess)
      {
        thisService.ActiveContact.value =  onSuccess;

      },
       function(onError){
        console.log(onError);
      });

    }

 }]);
