app.filter('choosePrimaryContact', function() {
    return function(input, scope) {
        if (input.phonenumber != null ) {
            return input.phonenumber;
        } else {
            if (input.email != null) {
                return input.email;
            } else {
                if (input.address != null) {
                    return input.address;
                } else {
                    return "No primary contact";
                }
            }
        }
    }
})
