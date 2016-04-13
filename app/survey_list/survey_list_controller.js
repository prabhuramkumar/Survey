'use strict';

angular.module('surveyList')
.controller('SurveyListCtrl', ['surveyListService', '$location', 
	function(surveyListService, $location) {
		var controller = this;
		controller.dataAvilable = false;
		controller.error = '';

		surveyListService.getSurveyList().then(function(data){
			controller.dataAvilable = true;
			controller.surveyList = data.survey_results;
		}).catch(function(error){
			controller.dataAvilable = false;
			controller.error = error;
		});

		controller.goToSurveyDetails = function(id) {
			$location.path('/details/'+id);
		}
	}]);