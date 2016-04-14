'use strict';

angular.module('commonComponents').directive('pageError', function() {
	return {
		restrict: "E",
		scope: {
			message: '='
		},
		templateUrl: 'app/common_components/error/page_error.html'
	}
});