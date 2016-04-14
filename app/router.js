angular.module('Survey').config(['$stateProvider', function($stateProvider) {
  $stateProvider.state('listPage', {
    url: '/',
    templateUrl: 'app/survey_list/survey_list_view.html',
    controller: 'SurveyListCtrl',
    controllerAs: 'SurveyListCtrl'
  }).state('detailsPage', {
    url: '/details/:id',
    templateUrl: 'app/survey_details/survey_details_view.html',
    controller: 'SurveyDetailsCtrl',
    controllerAs: 'SurveyDetailsCtrl'
  });

}]);