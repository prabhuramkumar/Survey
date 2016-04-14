'use strict';

angular.module('surveyDetails')
.controller('SurveyDetailsCtrl', ['surveyListService', 'surveyDetailsService', '$stateParams',
	function(surveyListService, surveyDetailsService, $stateParams) {
		var controller = this;
		var surveyListUrl = '/survey_results/index.json';
		var url;
		controller.isLoading = true;
		controller.error = false;
		controller.contentReady = false;

		surveyListService.getSurveyList(surveyListUrl).then(function(surveyList){
			url = surveyList[$stateParams.id-1].url;
			fetchSurveyDetails();
		});

		function fetchSurveyDetails(){
			surveyDetailsService.getSurveyDetails(url).then(function(data){
				controller.surveyDetails = data.survey_result_detail;
				controller.surveyDetails.themes.forEach(function(theme) {
					addAverageRating(theme.questions);
				});
				}).catch(function(error){
					controller.error = true;
					controller.errorMsg = "Trouble loading Details, Try again.";
				}).finally(function() {
					controller.isLoading = false;
					controller.contentReady = true;
			});
		}

		function addAverageRating(questions) {
			questions.forEach(function(question){
				question.average_rating = calculateAvgRating(question.survey_responses);
			})
		}

		function calculateAvgRating(responses) {
			var totalRating = 0,
				noOfValidResponses = 0,
				avgRating = 0;
				
			responses.forEach(function(response){
				var rating = response.response_content;
				if(rating){
					totalRating += parseInt(rating);
					noOfValidResponses++;
				}
			});
			avgRating = totalRating/noOfValidResponses;
			return avgRating;
		}
	}]);