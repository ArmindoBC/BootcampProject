app.service('ContactsService', ['UtilsService', '$http', function(UtilsService, $http) {

    this.CollectionName = "contacts";
    this.AllItems;

    this.GetAll = function(onComplete, onError) {
        //Request to the Server
        var thisHandler = this;
        $http({
            method: 'GET',
            url: 'http://localhost:9003/contact',
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

    this.SaveItem = function(item, onComplete, onError) {
        var path = "";
        //Check if already Exists
        if (item.id != null) {
            path += "/" + item.id;
        }
        $http({
            method: 'POST',
            url: 'http://localhost:9003/contact' + path,
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

    this.RemoveById = function(item, onComplete, onError) {
        var path = "";
        //Check if it Exists
        if (item.id != null) {
            path += "/" + item.id;
        }
        $http({
            method: 'DELETE',
            url: 'http://localhost:9003/contact' + path,
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

    this.GetById = function(id, onComplete, onError) {
      var path = "/" + id;

      $http({
          method: 'GET',
          url: 'http://localhost:9003/contact' + path
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

    this.GetElementIndexById = function(id) {
        console.log(this.AllItems);
        var List = this.AllItems;
        for (var i = 0; i < List.length; i++) {
            if (List[i].id == id) {
                return i;
            }
        }
        return null;
    }

}]);