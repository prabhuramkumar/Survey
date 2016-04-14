'use strict';

angular.module('surveyList')
.controller('SurveyListCtrl', ['surveyListService', '$state',
	function(surveyListService, $state) {
		var controller = this;
		var url = '/survey_results/index.json';
		controller.dataAvilable = false;
		controller.error = '';

		surveyListService.getSurveyList(url).then(function(data){
			controller.dataAvilable = true;
			controller.surveyList = data.survey_results;
		}).catch(function(error){
			controller.dataAvilable = false;
			controller.error = error;
			controller.errorMsg = "Trouble loading Data. Try Again Later.";
		});

		controller.goToSurveyDetails = function(list) {
			$state.go('detailsPage', {params: {surveyList: list} });
		}
	}]);