app.filter('showFirstLastName', function() {
    return function(input, scope) {
        if (input != null) {
            var stringArr = input.split(" ");
            var result = "";
            result = input.split(" ")[0] + ' ' + input.split(" ")[stringArr.length-1];

            return result;
        }
    }
})
