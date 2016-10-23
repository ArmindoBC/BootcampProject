app.filter('getContactAge', function() {
    function calculateAge(birthday) { // birthday is a date
        birthday = new Date(birthday);
        var ageDifMs = Date.now() - birthday.getTime();
        var ageDate = new Date(ageDifMs); // miliseconds from epoch
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }

    function monthDiff(d1, d2) {
        if (d1 < d2) {
            var months = d2.getMonth() - d1.getMonth();
            return months <= 0 ? 0 : months;
        }
        return 0;
    }
    return function(birthdate) {
        if (!isNaN(parseInt(birthdate))) {
            var age = calculateAge(birthdate);
            if (age == 0)
                return "(" + monthDiff(birthdate, new Date()) + ' months)';
            var result = "(" + age + " years)";
            return result;
        }
    };
});
