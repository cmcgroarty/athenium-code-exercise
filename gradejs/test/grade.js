var chai = require('chai');
chai.config.includeStack = false;
chai.assert.includeStack = false;
var should = chai.should();
var grade = require('../grade');

var givenScores = {
	fromProblem: [99, 92, 91, 91, 89, 85, 83, 82, 80, 79, 78, 78, 77, 76, 75, 74, 62, 55, 43, 20],
	notMultiple5: [99, 88, 86, 77, 75, 66, 55, 40, 38, 31, 22],
	identical: [90, 90, 90, 90, 90, 50, 40, 30, 20],
	lessThan5: [90, 80, 40]
};
var expectedGrades = {
	fromProblem: {
		A: [99, 92, 91, 91],
		B: [89, 85, 83, 82],
		C: [80, 79, 78, 78],
		D: [77, 76, 75, 74],
		F: [62, 55, 43, 20]
	},
	notMultiple5: {A: [99, 88], B: [86, 77], C: [75, 66], D: [55, 40], F: [38, 31, 22]},
	identical: {A: [90, 90, 90, 90, 90], not: 90},
	lessThan5: {}
};


describe('gradejs', function () {
	describe('#gradeScores()', function () {
		it('should gracefully error when scores is null', function (done) {
			grade(null, function (err) {
				should.exist(err);
				err.message.should.equal("no scores provided to grade");
				done();
			});
		});
		it('should gracefully error when scores.length < 1', function (done) {
			grade([], function (err) {
				should.exist(err);
				err.message.should.equal("no scores provided to grade");
				done();
			});
		});
		it('should not error when scores.length < 5', function (done) {
			grade(givenScores.lessThan5, function (err, grades) {
				should.not.exist(err);
				should.exist(grades);
				done();
			});
		});
		it('should return an object of arrays', function (done) {
			grade(givenScores.fromProblem, function (err, grades) {
				should.exist(grades);
				should.exist(grades.A);
				should.exist(grades.B);
				should.exist(grades.C);
				should.exist(grades.D);
				should.exist(grades.F);

				grades.should.be.an('object');
				grades.should.have.property('A').that.is.an('array');
				grades.should.have.property('B').that.is.an('array');
				grades.should.have.property('C').that.is.an('array');
				grades.should.have.property('D').that.is.an('array');
				grades.should.have.property('F').that.is.an('array');
				done();
			});
		});

		it('should assign scores from problem with grades from problem', function (done) {
			grade(givenScores.fromProblem, function (err, grades) {
				should.exist(grades);
				grades.A.should.have.members(expectedGrades.fromProblem.A);
				grades.B.should.have.members(expectedGrades.fromProblem.B);
				grades.C.should.have.members(expectedGrades.fromProblem.C);
				grades.D.should.have.members(expectedGrades.fromProblem.D);
				grades.F.should.have.members(expectedGrades.fromProblem.F);
				done();
			});
		});

		it('should handle scores.length that is not multiple of 5', function (done) {
			grade(givenScores.notMultiple5, function (err, grades) {
				should.not.exist(err);
				should.exist(grades);

				grades.A.should.have.members(expectedGrades.notMultiple5.A);
				grades.B.should.have.members(expectedGrades.notMultiple5.B);
				grades.C.should.have.members(expectedGrades.notMultiple5.C);
				grades.D.should.have.members(expectedGrades.notMultiple5.D);
				grades.F.should.have.members(expectedGrades.notMultiple5.F);

				done();
			});
		});

		it('should assign identical scores with the same grade', function (done) {
			grade(givenScores.identical, function (err, grades) {
				should.exist(grades);
				grades.A.should.have.members(expectedGrades.identical.A);
				grades.B.should.not.include(expectedGrades.identical.not);
				grades.C.should.not.include(expectedGrades.identical.not);
				grades.D.should.not.include(expectedGrades.identical.not);
				grades.F.should.not.include(expectedGrades.identical.not);
				done();
			});
		});
	});
});