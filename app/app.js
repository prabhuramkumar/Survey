'use strict';

// Declare app level module which depends on views, and components
var Survey = angular.module('Survey', [
  'ngRoute',
  'surveyList'
]);


Survey.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'app/survey_list/survey_list_view.html',
    controller: 'SurveyListCtrl',
    controllerAs: 'SurveyListCtrl'
  }).when('/details/:id', {
    templateUrl: 'app/survey_details/survey_details.html'
  });

  $routeProvider.otherwise({redirectTo: '/'});
}]);