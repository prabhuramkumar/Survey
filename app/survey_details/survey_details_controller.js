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
				question.individual_rating_values = controller.findIndividualRatings(question.survey_responses);
				question.average_rating = controller.calculateAvgRating(question.individual_rating_values);
			})
		}

		controller.calculateAvgRating = function(individualRatings) {
			var totalRating = 0,
				noOfResponses = 0,
				avgRating = 0;
			console.log(individualRatings);		
			individualRatings.forEach(function(ratingValue){
				totalRating += ratingValue.count * (ratingValue.number);
				noOfResponses++;
			});
			avgRating = totalRating/noOfResponses;
			return avgRating;
		}

		controller.findIndividualRatings = function(responses){
			var ratingModel = {
				maxRating: 5,
				ratingStrings: ["ones", "twos", "threes", "fours", "fives"],
				intialCount: 0			
			}, ratingValues = [];

			for(var i=0; i<ratingModel.maxRating; i++){
				ratingValues.push({
					number: i+1,
					text: ratingModel.ratingStrings[i],
					count: ratingModel.intialCount
				})
			}

			responses.forEach(function(response){
				var responseRating = response.response_content;
				
				if(responseRating){
					responseRating = parseInt(responseRating);
					ratingValues.forEach(function(ratingValue){
						if(responseRating == ratingValue.number){
							ratingValue.count++;  
						}
					});
				}
			});
			return ratingValues;
		}

		controller.init();
	}]);