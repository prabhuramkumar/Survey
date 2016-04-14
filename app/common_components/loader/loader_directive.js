'use strict';

angular.module('commonComponents', []).directive('loader', function() {
	return {
		restrict: "E",
		templateUrl: 'app/common_components/loader/loader.html'
	}
});