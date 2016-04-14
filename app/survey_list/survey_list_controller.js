'use strict';

angular.module('surveyList')
.controller('SurveyListCtrl', ['surveyListService', '$state', '$rootScope',
	function(surveyListService, $state, $rootScope) {
		var controller = this;
		var url = '/survey_results/index.json';

        controller.state = surveyListService.state; 
		surveyListService.getSurveyList(url).then(function(surveyList){
			controller.surveyList = surveyList;
		});

		controller.goToSurveyDetails = function(index) {
			$state.go('detailsPage', {id: index+1} );
		}
	}]);