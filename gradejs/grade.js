module.exports = function gradeScores(scores, callback) {

	//console.info("cmcg.projects.athenium.gradejs.gradeScores()");

	// store statistical information to calculate grades
	// grade: 		letter grade information describes
	// percentile: 	the percentile a letter grade represents
	// index:		ceiling integer representing index of value at percentile
	// value:		score value that represents lower limit for letter grade
	var m_stats = [
		{
			grade: "A",
			percentile: 0.8,
			index: null,
			value: null
		},
		{
			grade: "B",
			percentile: 0.6,
			index: null,
			value: null
		},
		{
			grade: "C",
			percentile: 0.4,
			index: null,
			value: null
		},
		{
			grade: "D",
			percentile: 0.2,
			index: null,
			value: null
		},
		{
			grade: "F",
			percentile: 0.0,
			index: null,
			value: null
		}
	];

	// store scores in array for each letter grade when assigned
	// to be returned/used in callback
	var m_grades = {"A": [], "B": [], "C": [], "D": [], "F": []};

	// help organize/run our code
	var async = require('async');

	// no need to run analysis and assign if there are no scores
	if(scores && scores.length > 0) {

		async.series([
			// sort the scores from lowest to highest
			// so we can calculate the percentile indexes and values
			function sortScores(step) {
				//console.info("cmcg.projects.athenium.gradejs.gradeScores().sortScores()");
				scores.sort(function (a, b) {
					return a - b ;
				});
				step();
			},
			// take sorted scores, find the indexes for each letter grade
			// then store the value for that index
			function calcStats(step) {
				//console.info("cmcg.projects.athenium.gradejs.gradeScores().calcStats()");
				var count = scores.length;
				async.forEach(m_stats, function (stat, cb) {
					stat.index = Math.floor(count * stat.percentile);
					stat.value = scores[stat.index];
					cb();
				}, function () {
					step();
				});
			},
			// step through scores array and assign it a letter grade based on value cutoff
			function assignGrades(step) {
				//console.info("cmcg.projects.athenium.gradejs.gradeScores().assignGrades()");
				async.forEach(scores, function (score, cb) {
					// find which cutoff the score is GTE
					// then place in corresponding array
					for (i = 0; i < m_stats.length; i++) {
						if (score >= m_stats[i].value) {
							m_grades[m_stats[i].grade].push(score);
							break;
						}
					}
					cb();
				}, function (err) {
					step(err);
				});
			}
		], function (err) {
			if (!err) {
				// everything went right, send grades to callback
				callback(null, m_grades);
			} else {
				callback(err);
			}
		});
	} else {
		// array was null/undefined/empty
		// return error
		callback(new Error("no scores provided to grade"));
	}
};