(function () {
	var grade = require('./grade');

	var scores = [99, 88, 86, 77, 75, 66, 55, 40, 38, 31, 22];
	grade(scores, function (err, grades) {
		if (!err) {
			console.log(grades);
		} else {
			console.error(err);
		}
	});
})();