'use strict';

angular.module('surveyDetails', [])
.controller('SurveyDetailsCtrl', ['surveyListService', 'surveyDetailsService', '$stateParams',
	function(surveyListService, surveyDetailsService, $stateParams) {

		var controller = this;
		var surveyListUrl;


		controller.init = function(){
			surveyListUrl = '/survey_results/index.json';
			controller.isLoading = true;
			controller.error = false;

			surveyListService.getSurveyList(surveyListUrl).then(function(surveyList){
				controller.url = surveyList[$stateParams.id-1].url;
				controller.fetchSurveyDetails();
			});
		}

		controller.fetchSurveyDetails = function(){
			surveyDetailsService.getSurveyDetails(controller.url).then(function(data){
					controller.surveyDetails = data.survey_result_detail;
					controller.surveyDetails.themes.forEach(function(theme) {
						controller.addAverageRating(theme.questions);
					});
				}).catch(function(error){
					controller.error = true;
					controller.errorMsg = "Trouble loading Details, Try again.";
				}).finally(function() {
					controller.isLoading = false;
			});
		}

		controller.addAverageRating = function(questions) {
			questions.forEach(function(question){
				var ratingModel = new SurveyRatingsModel();
				question.individual_rating_values = ratingModel.getIndividualRatings(question.survey_responses);
				question.average_rating = ratingModel.getAvgRating(question.individual_rating_values);
			})
		}

		controller.init();
	}]);