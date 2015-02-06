'use strict';

angular.module('angular-component.app-bootstrap-dictionary-web', ['ngRoute','app-bootstrap-dictionary-webTemplate.html','bootstrapControllers','bootstrapServices','bootstrapDirectives'])
  .config(['$routeProvider',function($routeProvider){
  $routeProvider
    .when('/dictionaries', {
      templateUrl: 'template/dictionaries.html',
      controller: 'DictionaryController'
    })
    .when('/grid-dictionaries', {
      templateUrl: 'template/gridDictionaries.html',
      controller: 'DictionaryController'
    });
}]);

var bootstrapControllers = angular.module('bootstrapControllers',[]);
var bootstrapServices = angular.module('bootstrapServices',[]);
var bootstrapDirectives = angular.module('bootstrapDirectives',['angular-component.app-grid']);


