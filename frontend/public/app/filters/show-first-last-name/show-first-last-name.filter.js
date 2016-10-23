app.filter('showFirstLastName', function() {
    return function(input, scope) {
        if (input != null) {
            var stringArr = input.split(" ");
            var result = "";
            if (stringArr.length > 1) {
                result = input.split(" ")[0] + ' ' + input.split(" ")[stringArr.length - 1];
            } else {
                result = input.split(" ")[0];
            }
            return result;
        }
    }
})
