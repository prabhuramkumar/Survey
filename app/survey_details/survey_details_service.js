angular.module('surveyDetails', []).service('surveyDetailsService', ['$http', function($http){

    var url = '../../survey_results/1.json';

    function getSurveyDetails(){
        return $http.get(url).then(function(data){
            return  data.data;
        });
    }

    return {
        getSurveyDetails: getSurveyDetails
    }
}]);