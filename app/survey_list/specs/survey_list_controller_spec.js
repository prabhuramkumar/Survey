'use strict';

describe('#surveyListCtrl', function() {
	beforeEach(module('surveyList'));
	var ctrl, scope, surveyListController, surveyListService, diferred, url, rootScope, state;

	beforeEach(angular.mock.inject(function($rootScope, $controller, $q){
		rootScope = $rootScope;
		ctrl = $controller;
  		scope = $rootScope.$new();
  		// surveyListService = {getSurveyList: function() {}};
      surveyListService = jasmine.createSpyObj('surveyListService', ['getSurveyList']);
  		state = jasmine.createSpyObj('$state', ['go']);
  		surveyListService.state = {isLoading: true, 
									error: false};
  		diferred = $q.defer();

  		// spyOn(surveyListService, "getSurveyList").andReturn(diferred.promise);
  		surveyListService.getSurveyList.andReturn(diferred.promise);

      surveyListController = ctrl('SurveyListCtrl', {
        	surveyListService: surveyListService,
        	$state: state,
        	$rootScope: rootScope});
        url= "/survey_results/index.json";
  	}));

  	describe('on getSurveyList method call', function(){
  		it('should getSurveyList have been called with url', function () {
  			diferred.resolve("the-list");
  			rootScope.$apply();
        expect(surveyListService.getSurveyList).toHaveBeenCalledWith(url);
        expect(surveyListController.surveyList).toEqual("the-list");
      });


      it('should state.go have been called with index + 1', function () {

        var index = 1;
        surveyListController.goToSurveyDetails(index);
        expect(state.go).toHaveBeenCalledWith('detailsPage', {id: index+1} );
        // expect(surveyListController.surveyList).toEqual("the-list");
      });
  	});

});
