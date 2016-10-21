app.service('ActiveContactService', ['$location', '$route', 'ContactsService', function($location, $route, ContactsService) {

    this.ActiveContact;
    this.mode = "show";
    var thisService = this;

    this.DiscardChanges = function() {
        alert('Your changes were discarded');
        this.setShowMode();
    }

    this.setCreateMode = function() {
        alert('Create a new Contact');
        this.mode = "edit";
        $location.path('/edit/');
        $route.reload();
    }

    this.setEditMode = function() {
        alert('Please Edit Current Contact');
        this.mode = "edit";
        $location.path('/edit/' + this.ActiveContact.id);
        $route.reload();
    }

    this.setShowMode = function(id) {
        this.mode = "show";
        // $location.path('/');
        if (id == null) {
            $location.path('/')
        } else {
            $location.path('/details/' + id);
        }
        $route.reload();
    }

    this.changeActiveContact = function(contactId, onComplete, onError) {
        ContactsService.GetById(contactId,
            function(response) {
                thisService.ActiveContact = response;
                onComplete();
            },
            function(onError) {
                console.log(onError);
                onError(onError);
            });
    }

}]);
