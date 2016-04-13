'use strict';

angular.module('surveyDetails')
.controller('SurveyDetailsCtrl', ['surveyDetailsService', '$routeParams',
	function(surveyDetailsService, $routeParams) {
		var controller = this;
		controller.dataAvilable = false;
		controller.error = false;
		surveyDetailsService.getSurveyDetails().then(function(data){
			controller.surveyDetails = data.survey_result_detail;
			controller.surveyDetails.themes.forEach(function(theme) {
				addAverageRating(theme.questions);
			});
			controller.dataAvilable = true;
		}).catch(function(error){
			controller.dataAvilable = false;
			controller.error = true;
		}).finally(function() {
			controller.dataAvilable = true;
		});

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