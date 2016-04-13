angular.module('surveyList', []).service('surveyListService', ['$http', function($http){
    var basePath = '../../';

    function getSurveyList(url){
        return $http.get(basePath+url).then(function(data){
            return data.data;
        });
    }

    return {
        getSurveyList: getSurveyList
    }
}]);