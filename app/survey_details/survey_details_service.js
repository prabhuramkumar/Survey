angular.module('surveyDetails', []).service('surveyDetailsService', ['$http', function($http){

    var basePath = '../../';

    function getSurveyDetails(url){
        return $http.get(basePath+url).then(function(data){
            return  data.data;
        });
    }

    return {
        getSurveyDetails: getSurveyDetails
    }
}]);