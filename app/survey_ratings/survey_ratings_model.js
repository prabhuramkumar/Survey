'use strict';
function SurveyRatingsModel() {
	var ratingModel = {
			maxRating: 5,
			ratingStrings: ["ones", "twos", "threes", "fours", "fives"],
			intialCount: 0			
		}, ratingValues = [];

	var getAvgRating = function(individualRatings) {
			var totalRating = 0,
				noOfResponses = 0,
				avgRating = 0;
			individualRatings.forEach(function(ratingValue){
				totalRating += ratingValue.count * (ratingValue.number);
				noOfResponses += ratingValue.count;
			});
			avgRating = totalRating/noOfResponses;
			return avgRating;
		}	

	var getIndividualRatings = function (responses) {
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

	return {
		"getIndividualRatings": getIndividualRatings,
		"getAvgRating": getAvgRating
	}
}