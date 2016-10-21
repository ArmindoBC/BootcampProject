app.service('FileUpload', ['$http', function($http) {
    this.uploadFileToUrl = function(file, uploadUrl) {
        var fd = new FormData();
        fd.append('file', file);

        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {
                'Content-Type': undefined
            }
        })

        .success(function() {
            console.log("SUCESSO");

        })

        .error(function() {
            console.log("ERRO");

        });
    }
}]);
