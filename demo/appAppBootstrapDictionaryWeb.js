<!-- Defining AngularJS main module for this demo -->
var appAppBootstrapDictionaryWeb = angular.module('appAppBootstrapDictionaryWeb', ['angular-component.app-bootstrap-dictionary-web',
  'ngRoute','ngResource','ngCookies']);

appAppBootstrapDictionaryWeb
  .config(['$routeProvider',
    function ($routeProvider) {
      $routeProvider
        .when('/demo', {
          templateUrl: 'views/demoAppBootstrapDictionaryWeb.html'

        })
        .when('/demoDictionaries', {
          templateUrl: 'views/demoDictionaries.html'

        })
        .otherwise({
          templateUrl:'views/otherPage.html'
        });
    }]);
