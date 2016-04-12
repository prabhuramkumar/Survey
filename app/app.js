'use strict';

// Declare app level module which depends on views, and components
var Survey = angular.module('Survey', [
  'ngRoute'
]);


Survey.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'app/survey_list/survey_list.html'
  }).when('/details', {
    templateUrl: 'app/survey_details/survey_details.html'
  });

  $routeProvider.otherwise({redirectTo: '/'});
}]);