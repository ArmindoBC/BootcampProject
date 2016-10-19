//TO DO
app.filter('firstCharacterUpperCase', function() {
	return function(input) {
		var nameParts = input.split(" ");
		var newName = "";
		for (var i = 0; i < nameParts.length - 1; i++) {
			newName += nameParts[i] + " ";
		}
		return newName + nameParts[nameParts.length - 1].toUpperCase();
	};
});
