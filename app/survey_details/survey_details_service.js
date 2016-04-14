angular.module('surveyDetails').service('surveyDetailsService', ['$http', function($http){

    function getSurveyDetails(url){
        return $http.get(url).then(function(data){
            return  data.data;
        });
    }

    return {
        getSurveyDetails: getSurveyDetails
    }
}]);