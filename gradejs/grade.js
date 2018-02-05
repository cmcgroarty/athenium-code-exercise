module.exports = function gradeScores(scores, callback) {

	//console.info("cmcg.projects.athenium.gradejs.gradeScores()");

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

	var m_grades = {"A": [], "B": [], "C": [], "D": [], "F": []};

	var async = require('async');

	if(scores && scores.length > 0) {

		async.series([
			function sortScores(step) {
				//console.info("cmcg.projects.athenium.gradejs.gradeScores().sortScores()");
				scores.sort(function (a, b) {
					return a - b ;
				});
				step();
			},
			function calcStats(step) {
				//console.info("cmcg.projects.athenium.gradejs.gradeScores().calcStats()");
				var count = scores.length;
				async.forEach(m_stats, function (stat, cb) {
					stat.index = Math.ceil(count * stat.percentile);
					stat.value = scores[stat.index];
					cb();
				}, function () {
					step();
				});
			},
			function assignGrades(step) {
				//console.info("cmcg.projects.athenium.gradejs.gradeScores().assignGrades()");
				async.forEach(scores, function (score, cb) {
					for (i = 0; i < m_stats.length; i++) {
						if (score >= m_stats[i].value) {
							m_grades[m_stats[i].grade].push(score);
							break;
						}
					}
					cb();
				}, function () {
					step();
				});
			}
		], function (err) {
			if (!err) {
				callback(null, m_grades);
			} else {
				callback(err);
			}
		});
	} else {
		callback(new Error("no scores provided to grade"));
	}
};