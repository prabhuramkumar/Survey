angular.module('surveyList', []).service('surveyListService', ['$http', function($http){
    var url = '../../data/index.json';

    function getSurveyList(){
        return $http.get(url).then(function(data){
            return data.data;
        });
    }

    return {
        getSurveyList: getSurveyList
    }
}]);