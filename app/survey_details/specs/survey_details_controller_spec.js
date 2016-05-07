'use strict';

describe('#surveyDetailsCtrl', function() {
	beforeEach(module('surveyDetails'));
	var ctrl, scope, surveyDetailsController, surveyListService, surveyDetailsService, diferred, url, rootScope, secondDiferred, stateParams, someSurveyDetails, questions;

	beforeEach(angular.mock.inject(function($rootScope, $controller, $q){
		rootScope = $rootScope;
		ctrl = $controller;
  		scope = $rootScope.$new();

      surveyListService = jasmine.createSpyObj('surveyListService', ['getSurveyList']);
      surveyDetailsService = jasmine.createSpyObj('surveyDetailsService', ['getSurveyDetails']);

  		diferred = $q.defer();
      secondDiferred = $q.defer();

  		surveyListService.getSurveyList.andReturn(diferred.promise);
      surveyDetailsService.getSurveyDetails.andReturn(secondDiferred.promise);

      stateParams = {id: 1};

      surveyDetailsController = ctrl('SurveyDetailsCtrl', {
        	surveyListService: surveyListService,
          surveyDetailsService: surveyDetailsService,
        	$stateParams: stateParams,
        	$rootScope: rootScope
      });

      url= "/survey_results/index.json";
  	}));

  	describe('on controller init method call', function(){
  		it('should intialize and get surveyList', function () {
        spyOn(surveyDetailsController, "fetchSurveyDetails");

        expect(surveyDetailsController.isLoading).toBeTruthy();
        expect(surveyDetailsController.error).toBeFalsy();

        diferred.resolve([{"url": "some-url"}]);
        rootScope.$apply();

        expect(surveyDetailsController.url).toEqual("some-url");
        expect(surveyDetailsController.fetchSurveyDetails).toHaveBeenCalled();
      });

  	});

    describe('on fetchSurveyDetails call', function(){
      beforeEach(function () {
        // spyOn(surveyDetailsController, "addAverageRating");
        // spyOn(surveyDetailsController, "calculateAvgRating");
        questions = [
          {
            "description": "I like the kind of work I do.",
            "question_type": "ratingquestion",
            "survey_responses": [
              {
                "id": 1,
                "question_id": 1,
                "respondent_id": 1,
                "response_content": "5"
              },
              {
                "id": 6,
                "question_id": 1,
                "respondent_id": 2,
                "response_content": "4"
              }
            ],
            "individual_rating_values": ["individual Counts"]
          }
        ];
        someSurveyDetails = {"themes": [{"questions":questions}]};
        secondDiferred.resolve({"survey_result_detail": someSurveyDetails});
        surveyDetailsController.url = url;
        surveyDetailsController.fetchSurveyDetails(); 

        // rootScope.$apply();
      });

      it('should getSurveyDetails', function () {
        spyOn(surveyDetailsController, "addAverageRating");
        rootScope.$apply();
        expect(surveyDetailsService.getSurveyDetails).toHaveBeenCalledWith(url);
        expect(surveyDetailsController.surveyDetails).toEqual(someSurveyDetails);
        expect(surveyDetailsController.addAverageRating).toHaveBeenCalledWith(questions);
      });

      it("should call addAverageRating with list of question", function(){
        spyOn(surveyDetailsController, "calculateAvgRating");
        rootScope.$apply();
        expect(surveyDetailsController.calculateAvgRating).toHaveBeenCalledWith(questions[0].individual_rating_values);
      });

      // it("should call calculateAvgRating with list of survey_responses", function(){
      //   surveyDetailsController.calculateAvgRating(questions[0].survey_responses);
      //   expect(questions[0].average_rating).toEqual(4.5);
      // });

    });

});
