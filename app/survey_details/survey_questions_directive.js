'use strict';

angular.module('surveyDetails').directive('surveyQuestions', function() {
	return {
		restrict: "E",
		scope: {
			questions: '='
		},
		templateUrl: 'app/survey_details/survey_questions.html'

	}
});