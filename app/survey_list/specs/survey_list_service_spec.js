'use strict';

describe('#surveyListService', function() {
	beforeEach(module('surveyList'));
	var ctrl, q, scope, diferred, url, rootScope, service, http;

	beforeEach(angular.mock.inject(function($q, $http, $rootScope){
		rootScope = $rootScope;
  	diferred = $q.defer();
    // service = $service;
    http = $http;
    q = $q;

    url= "/survey_results/1.json";

  	}));

  	describe('on getSurveyList method call', function(){
  		it('should getSurveyList have been called with url', inject(function (surveyListService) {
        spyOn(surveyListService, "fetchSurveyList");
  			surveyListService.getSurveyList(url);
        expect(surveyListService.fetchSurveyList).toHaveBeenCalledWith(url);
      }));


      it("should fetchSurveyList is called with url and return surveyList", inject(function (surveyListService){
        spyOn(http, "get").andReturn(diferred.promise);
        diferred.resolve({"data": {"survey_results": ["survey-list"]}});

        surveyListService.fetchSurveyList(url).then(function() {
          expect(http.get).toHaveBeenCalledWith(url);
        });

        rootScope.$apply();
      }));
  	});

});
