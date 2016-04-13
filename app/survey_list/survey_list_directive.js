'use strict';

angular.module('surveyList').directive('surveyList', function() {
	return {
		restrict: "E",
		scope: {
			list: '='
		},
		templateUrl: 'app/survey_list/survey_list.html',
		link: function(scope, element){
			scope.goToSurveyDetails = function () {
				alert("sd");
			}
			scope.surveyRate = function(rate) {
				return rate.toPrecision(4)*100;
			}
		}
	}
});