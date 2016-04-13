angular.module('Survey').filter('precision', function(){
  return function(value, precisionPoint){
    return value.toPrecision(precisionPoint);
  }
}).filter('percentagePrecision', function(){
  return function(rate, precisionPoint){
    return rate.toPrecision(precisionPoint)*100;
  }
});