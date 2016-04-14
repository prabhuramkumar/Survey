'use strict';

describe('#surveyDetailsCtrl', function() {
	beforeEach(module('surveyDetails'));
	var ctrl, scope, surveyDetailsController, surveyListService, surveyDetailsService, diferred, url, rootScope, secondDiferred, stateParams;

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
      it('should getSurveyDetails', function () {
        spyOn(surveyDetailsController, "addAverageRating");
        var someSurveyDetails = {"themes": [{"questions":"my-question"}]};
        secondDiferred.resolve({"survey_result_detail": someSurveyDetails});
        surveyDetailsController.url = url;

        surveyDetailsController.fetchSurveyDetails(); 

        rootScope.$apply();

        expect(surveyDetailsService.getSurveyDetails).toHaveBeenCalledWith(url);
        expect(surveyDetailsController.surveyDetails).toEqual(someSurveyDetails);
        expect(surveyDetailsController.addAverageRating).toHaveBeenCalledWith("my-question");
      });

    });

});
