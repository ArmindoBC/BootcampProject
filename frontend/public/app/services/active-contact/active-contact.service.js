app.service('ActiveContactService', ['ContactsService', function(ContactsService) {

    this.ActiveContact;

    this.changeActiveContact = function(contactId){
      ContactsService.GetById(contactId,
         function(onSuccess)
      {
        this.ActiveContact =  onSuccess;
          console.log(this.ActiveContact);
      },
       function(onError){
        console.log(onError);
      });

    }

 }]);
