angular.module('Survey').config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'app/survey_list/survey_list_view.html',
    controller: 'SurveyListCtrl',
    controllerAs: 'SurveyListCtrl'
  }).when('/details/:id', {
    templateUrl: 'app/survey_details/survey_details_view.html',
    controller: 'SurveyDetailsCtrl',
    controllerAs: 'SurveyDetailsCtrl'
  });

  $routeProvider.otherwise({redirectTo: '/'});
}]);