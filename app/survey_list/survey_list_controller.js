'use strict';

angular.module('surveyList')
.controller('SurveyListCtrl', ['surveyListService',
	function(surveyListService) {
		var controller = this;
		controller.dataAvilable = false;
		controller.error = '';

		surveyListService.getSurveyList().then(function(data){
			controller.dataAvilable = true;
			controller.surveyList = data.survey_results;
			console.log(controller.surveyList);
		}).catch(function(error){
			controller.dataAvilable = false;
			controller.error = error;
		});
	}]);