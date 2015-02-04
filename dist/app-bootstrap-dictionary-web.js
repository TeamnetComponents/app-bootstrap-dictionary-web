/**
 * app-bootstrap-dictionary-web
 * @version v0.0.1 - 2015-02-04
 * @link http://git-components.teamnet.ro/summary/angular-component%2Fapp-bootstrap-dictionary-web.git
 * @author mihaela.petre mihaela.petre@teamnet.ro
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
'use strict';

angular.module('angular-component.app-bootstrap-dictionary-web', ['ngRoute','app-bootstrap-dictionary-webTemplate.html','bootstrapControllers','bootstrapServices'])
  .config(['$routeProvider',function($routeProvider){
  $routeProvider
    .when('/dictionaries', {
      templateUrl: 'template/dictionaries.html',
      controller: 'DictionaryController'
    });
}]);

var bootstrapControllers = angular.module('bootstrapControllers',[]);
var bootstrapServices = angular.module('bootstrapServices',[]);



angular.module('app-bootstrap-dictionary-webTemplate.html', []).run(['$templateCache', function($templateCache) {
  "use strict";
  $templateCache.put("template/app-bootstrap-dictionary-web.html",
    "<div>Hey</div>");
  $templateCache.put("template/dictionaries.html",
    "<div><h1>Dictionaries:</h1><br>{{dictionariesHttp}}</div>");
}]);

bootstrapControllers.controller('DictionaryController',['$scope','dataDictionariesHttp', function ($scope, $dataDictionariesHttp) {

  $scope.status; // http response status
  $scope.dictionariesHttp={}; //list of dictionaries


  // CRUD operations using $http service

  // Get all dictionaries
  var getDictionaries =  function() {
    console.log('Call getDictionaries method from DictionaryController...');

    $dataDictionariesHttp.getDictionaries()
      .success(function (dictionaries) {
        $scope.dictionariesHttp = dictionaries;
      })
      .error(function (error) {
        $scope.status = 'Unable to load dictionaries data: ' + error.message;
      });
  };

  //Get dictionary by id
  // Set flag = 1 to execute updateDictionary on http request success
  var getDictionary = function(id,flag){
    console.log('Call getDictionary(id,flag) method from DictionaryController...')
    $dataDictionariesHttp.getDictionary(id)
      .success(function (dictionary) {
        $scope.resultDictionary = dictionary;
      })
      .error(function (error) {
        $scope.status = 'Get dictionary by id result error: ' + error.message;
      }).then(function(){

        if(flag == 1){
          console.log("Do update..." );
          var dictionaryUpdated =  $scope.resultDictionary;
          //set new values for dictionary
          dictionaryUpdated.name= dictionaryUpdated.name+ " updated!";
          updateDictionary(dictionaryUpdated);

        }else{
          //TO DO.  do something else or nothing...
        }
      });
  };

  // Insert new dictionary
  var insertDictionary = function (){
    // set new dictionary object
    var dictionary = {"id":88,"code":"C_SYSTEM.TEST88","name":"Test88","description":"Testing post method88",
      "hasI18n":false,
      "collection":{"id":1}}
    console.log('Call insertDictionary method from DictionaryController...');
    $dataDictionariesHttp.insertDictionary(dictionary)
      .success(function () {
        $scope.dictionariesHttp.push(dictionary);
        $scope.status = 'Dictionary inserted!';
      }).
      error(function(error) {
        $scope.status = 'Unable to insert dictionary: ' + error.message;
      });
  };

  // Update dictionary
  var updateDictionary = function(dictionaryUpdated) {
    console.log(JSON.stringify(dictionaryUpdated));

    $dataDictionariesHttp.updateDictionary(dictionaryUpdated)
      .success(function () {
        $scope.status = ' Dictionary updated';
      })
      .error(function (error) {
        $scope.status = 'Unable to update dictionary: ' + error.message;
      });
  };

  // Delete dictionary
  var deleteDictionary = function(id) {
    $dataDictionariesHttp.deleteDictionary(id)
      .success(function () {
        $scope.status = 'Dictionary deleted!';
        for (var i = 0; i < $scope.dictionariesHttp.length; i++) {
          var dic = $scope.dictionariesHttp[i];
          if (dic.ID === id) {
            $scope.dictionariesHttp.splice(i, 1);
            break;
          }
        }
      })
      .error(function (error) {
        $scope.status = 'Unable to delete dictionary: ' + error.message;
      });
  };

  getDictionaries();

  // <-- end CRUD operations using $http service

  // <-- CRUD operations using $resource service
  //
  //// Get all dictionaries
  //// var dictionaries = $dataDictionariesResource.query(); // Calls: GET '/dictionary/rest/dictionaries'
  ////$scope.dictionariesResource = dictionaries;
  //
  //// Get dictionary by id
  //// var dictionary = $dataDictionariesResource.get({},{'Id': 1}); // Calls: GET '/dictionary/rest/dictionaries'
  //
  //$scope.saveResource =  function(){
  // var dictResource = {
  // code : $scope.codeInserted,
  // name : 'Dictionary inserted by MP',
  // description: '30.01.2015',
  // collection:{}
  // };
  // $dataDictionariesResource.save(dictResource);
  // };
  //
  ////Delete dictionary ID 1
  ////$dataDictionariesResource.delete({}, {'Id': 1000}); // Calls: DELETE '/dictionary/rest/dictionaries'
  //
  // <-- end CRUD operations using $resource service
  //
}]);

/* Dictionary Service using $http */
bootstrapServices.
  factory('dataDictionariesHttp',['$http', function ($http) {

    var urlBase ='/dictionary/rest/dictionaries';
    var dataDictionariesHttp = {};

    // Get all dictionaries
    dataDictionariesHttp.getDictionaries = function(){
      return $http.get(urlBase);
    };

    //Get dictionary (id)
    dataDictionariesHttp.getDictionary = function (id) {
      return $http.get(urlBase + '/' + id);
    };

    //Insert new dictionary
    dataDictionariesHttp.insertDictionary = function (dictionary) {
      return $http.post(urlBase, dictionary);
    };

    //Update dictionary
    dataDictionariesHttp.updateDictionary = function (dictionary) {
      return $http.post(urlBase,dictionary)
    };

    //Delete dictionary
    dataDictionariesHttp.deleteDictionary = function (id) {
      return $http.delete(urlBase + '/' + id);
    };

    return dataDictionariesHttp;


  }]);
/* <-- end $http dictionary service */

/* Dictionary Service using $resource*/
/*bootstrapServices.factory("dataDictionariesResource", function ($resource) {
  var urlBase ='/dictionary/rest/dictionaries';

  return $resource(
    urlBase,
    {Id: "@Id" },
    {
      "update": {method: "PUT"},
      "query":{method:"GET",isArray:false},
      "save":{method:"POST"}

    }

  );
});*/
/* <-- end $resource dictionary service*/


