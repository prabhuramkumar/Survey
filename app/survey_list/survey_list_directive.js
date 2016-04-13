'use strict';

angular.module('surveyList').directive('surveyList', function($location) {
	return {
		restrict: "E",
		templateUrl: 'app/survey_list/survey_list.html'
	}
});