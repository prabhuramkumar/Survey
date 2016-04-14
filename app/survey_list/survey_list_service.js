angular.module('surveyList', []).service('surveyListService', ['$http', function($http){

    function getSurveyList(url){
        return $http.get(url).then(function(data){
            return data.data;
        });
    }

    return {
        getSurveyList: getSurveyList
    }
}]);