(function () {
	// require our grading module
	var grade = require('./grade');

	// array of scores to grade
	// result is printed to console
	// todo: edit array for custom scoring
	var scores = [99, 92, 91, 91, 89, 85, 83, 82, 80, 79, 78, 78, 77, 76, 75, 74, 62, 55, 43, 20];


	grade(scores, function (err, grades) {
		if (!err) {
			// print resulting grades to console
			console.log("A: "+grades.A);
			console.log("B: "+grades.B);
			console.log("C: "+grades.C);
			console.log("D: "+grades.D);
			console.log("F: "+grades.F);

		} else {
			// print an error if we got one
			console.error(err);
		}
	});
})();