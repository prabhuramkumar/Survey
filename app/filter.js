angular.module('Survey').filter('precision', function(){
  return function(rate){
    return rate.toPrecision(4)*100;
  }
});