app.service('ContactsService', ['$http', 'UtilsService', function($http, UtilsService) {

    this.CollectionName = "contacts";
    this.AllItems;
    this.Model = new Contact();
    var thisService = this;
    this.basePath = "http://localhost";

    //connect to a remote server
    /*
    this.basePath = "http://localhost";
    if(window.location.hostname.indexOf('localhost')!=-1){
      this.basePath = "http://10.123.202.117";
    }*/

    //Model to fill in the placeholder content of angular inputs in html directives
    this.ModelCreate = {
        header: "Contact Name",
        name: "Please insert your name",
        phonenumber: "Please insert your mobile ",
        email: "Please insert your email",
        birthday: "Please select your birthday date",
        address: "Please insert your address",
        photo: "Please insert a link to your photo"
    }

    //get all contacts from server
    this.GetAll = function(onComplete, onError) {
        //Request to the Server
        var thisHandler = this;
        $http({
            method: 'GET',
            url: this.basePath + ':9003/contact',
        }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            thisHandler.AllItems = response.data;
            onComplete();
            //onComplete(response.data);
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            onError(response);
        });
    }

    //save changes made in a contact
    this.SaveItem = function(id, onComplete, onError) {
        var modelToSend = thisService.Model;
        delete modelToSend.id;
        $http({
            method: 'PATCH',
            url: this.basePath + ':9003/contact/' + id,
            data: modelToSend
        }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available

            onComplete();
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            console.log(response);
            onError(response);
        });
    }

    //create a contact
    this.CreateItem = function(onComplete, onError) {
        var modelToSend = thisService.Model;
        delete modelToSend.id;
        $http({
            method: 'POST',
            url: this.basePath + ':9003/contact',
            data: modelToSend
        }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            onComplete();
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            console.log(response);
            onError(response);
        });
    }

    //remove a contact by id
    this.RemoveById = function(item, onComplete, onError) {
        var path = "";
        //Check if it Exists
        if (item.id != null) {
            path += "/" + item.id;
        }
        $http({
            method: 'DELETE',
            url: this.basePath + ':9003/contact' + path,
            data: item
        }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            onComplete();
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            onError(response);
        });
    }

    //get a contact by id
    this.GetById = function(id, onComplete, onError) {
        $http({
            method: 'GET',
            url: this.basePath + ':9003/contact/' + id
        }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            onComplete(response.data);
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            onError(response);
        });
    }

    //search contact with autocomplete
    this.GetAutocomplete = function(string, onComplete, onError) {
        var thisHandler = this;

        $http({
            method: 'GET',
            url: this.basePath + ':9003/contact/autocomplete/' + string
        }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            thisHandler.AllItems = response.data;
            onComplete(response.data);
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            onError(response);
        });
    }

    //Upload a file to the server
    //this.onFileSelect = function($files) {
    // //$files: an array of files selected, each file has name, size, and type.
    // console.log($files);
    //     var $file = $files[0];
    //     Upload.upload({
    //         url: 'http://localhost:9003/contact',
    //         file: $file,
    //         progress: function(e) {}
    //     }).then(function(data, status, headers, config) {
    //         // file is uploaded successfully
    //         console.log(data);
    //     });
    //}

}]);
