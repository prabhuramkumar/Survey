angular.module('surveyList').service('surveyListService', ['$http', '$q', function($http, $q){

    var surveyList = [];
	var defer = $q.defer();

	var state = {error: '',
				isLoading: true};

    function fetchSurveyList(url){
        return $http.get(url).then(function(data){
            surveyList =  surveyList.concat(data.data.survey_results);
        	defer.resolve(surveyList);
        }).catch(function(error){
        	state.error = error;
        	state.errorMsg = "Data Loading Error."
        }).finally(function(){
        	state.isLoading = false;
        })
    }

    function getSurveyList(url){
    	if (surveyList.length !== 0) {
    		defer.resolve(surveyList);
    	} else {
    		this.fetchSurveyList(url);
    	};
    	return defer.promise;
    }


    return {
    	getSurveyList: getSurveyList,
    	state: state,
        fetchSurveyList: fetchSurveyList
    }
}]);