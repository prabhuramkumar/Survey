'use strict';

describe('#surveyDetailsService', function() {
	beforeEach(module('surveyDetails'));
	var q, diferred, url, rootScope, http;

	beforeEach(angular.mock.inject(function($http, $q, $rootScope){
		rootScope = $rootScope;
  	diferred = $q.defer();
    // service = $service;
    http = $http;
    q = $q;

    url= "/survey_results/1.json";

  	}));

  	describe('on getSurveyList method call', function(){
      it("should fetchSurveyList is called with url and return surveyList", inject(function (surveyDetailsService){
        spyOn(http, "get").andReturn(diferred.promise);
        diferred.resolve({"data": "some"});
        
        surveyDetailsService.getSurveyDetails(url).then(function(result) {
          expect(http.get).toHaveBeenCalledWith(url);
          expect(result).toEqual("some");
        });

        rootScope.$apply();
      }));
  	});

});
