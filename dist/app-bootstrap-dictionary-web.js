/**
 * app-bootstrap-dictionary-web
 * @version v0.0.1 - 2015-02-06
 * @link http://git-components.teamnet.ro/summary/angular-component%2Fapp-bootstrap-dictionary-web.git
 * @author mihaela.petre mihaela.petre@teamnet.ro
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
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



angular.module('app-bootstrap-dictionary-webTemplate.html', []).run(['$templateCache', function($templateCache) {
  "use strict";
  $templateCache.put("template/app-bootstrap-dictionary-web.html",
    "<div>Hey</div>");
  $templateCache.put("template/dictionaries.html",
    "<div><h1>Dictionaries:</h1><br>{{dictionariesHttp}}</div>");
  $templateCache.put("template/gridDictionaries.html",
    "<div>URL: {{url}}<app-grid url=url></app-grid></div>");
}]);

bootstrapControllers.controller('DictionaryController',['$scope','dataDictionariesHttp', function ($scope, $dataDictionariesHttp) {

  $scope.url = '/dictionary/rest/dictionaries';
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

  //getDictionaries();

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

'use strict';
/**
 * Checks if the given object is an array containing at least one element.
 * @param object the object to check
 * @returns {boolean} <code>true</code> if the given object is an array and contains at least one element; <code>false</code> otherwise.
 */
function isArrayWithData(object) {
  return object != undefined && object != null
    && Object.prototype.toString.call(object) === '[object Array]'
    && object.length != undefined && object.length > 0;
}

function widgetEffects(element) {
  $(element)
    .draggable({
      revert: true,
      zIndex: 2000,
      cursor: "crosshair",
      handle: '.box-name',
      opacity: 0.8
    })
    .droppable({
      tolerance: 'pointer',
      drop: function (event, ui) {
        var draggable = ui.draggable;
        var droppable = $(this);
        var dragPos = draggable.position();
        var dropPos = droppable.position();
        draggable.swap(droppable);
      }
    }).on('click', '.collapse-link', function (e) {
      e.preventDefault();
      var box = $(this).closest('div.box');
      var button = $(this).find('i');
      var content = box.find('div.box-content');
      content.slideToggle('fast');
      button.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
      setTimeout(function () {
        box.resize();
        box.find('[id^=map-]').resize();
      }, 50);
    })
    .on('click', '.close-link', function (e) {
      e.preventDefault();
      var content = $(this).closest('div.box');
      content.remove();
    }).on('click', '.expand-link', function (e) {
      var body = $('body');
      e.preventDefault();
      var box = $(this).closest('div.box');
      var button = $(this).find('i');
      button.toggleClass('fa-expand').toggleClass('fa-compress');
      box.toggleClass('expanded');
      body.toggleClass('body-expanded');
      var timeout = 0;
      if (body.hasClass('body-expanded')) {
        timeout = 100;
      }
      setTimeout(function () {
        box.toggleClass('expanded-padding');
      }, timeout);
      setTimeout(function () {
        box.resize();
        box.find('[id^=map-]').resize();
      }, timeout + 50);
    });
}

angular.module('angular-component.app-grid', ['app-grid-html-templates', 'ngResource', 'ui.grid', 'ui.grid.paging', 'pascalprecht.translate'])

  .directive('appGrid', ['$resource', '$compile', '$templateCache',
    function ($resource, $compile, $templateCache) {

      return {
        restrict: 'E',
        scope: {
          dataUrl: '=url',
          title: '=',
          columnDefs: '=',
          filter: '=',
          sort: '='
        },
        controller: 'appGridController',
        link: function ($scope, $element) {
          widgetEffects($($element));
        },
        compile: function () {
          return {
            pre: function ($scope, iElement) {
              if (iElement.children().length === 0) {
                iElement.append($compile($templateCache.get('template/app-grid.html'))($scope));
              }
            }
          };
        }
      };

    }])
  .controller('appGridController',
  ['$scope', '$resource', '$templateCache', 'GridTranslateService',
    function ($scope, $resource, $templateCache, GridTranslateService) {

      $scope.gridStyle = {};
      $scope.filters = isArrayWithData($scope.filter) ? $scope.filter : [];

      $scope.paginationOptions = {
        pageNumber: 0,
        pageSize: 25
      };

      $scope.uiGridOptions = {
        enableSorting: true,
        useExternalSorting: true,
        enableFiltering: true,
        useExternalFiltering: true,
        enablePaging: true,
        useExternalPaging: true
      };

      $scope.getPage = function () {
        var params = {
          page: $scope.paginationOptions.pageNumber,
          size: $scope.paginationOptions.pageSize,
          filters: $scope.filters,
          sort: []
        };
        var data = $resource($scope.dataUrl).get(params, function () {
          $scope.uiGridOptions.pagingPageSize = data.pageable.pageSize;
          $scope.uiGridOptions.pagingPageSizes = [data.pageable.pageSize];
          if (!isArrayWithData($scope.uiGridOptions.columnDefs)) {
            $scope.uiGridOptions.columnDefs = GridTranslateService.translate(buildColumnDefinitions(data), $scope.$root.locale);
          }
          $scope.uiGridOptions.data = data.content;
        });
      };

      function buildColumnDefinitions(data) {
        var columnDefinitions = [];
        if (isArrayWithData($scope.columnDefs)) {
          columnDefinitions = $scope.columnDefs;
        }
        else if (isArrayWithData(data.metadata)) {
          columnDefinitions = data.metadata;
        }
        else if (isArrayWithData(data.content)) {
          for (var field in data.content[0]) {
            var fieldDisplayName = field.charAt(0).toUpperCase() + field.slice(1).toLowerCase();
            columnDefinitions.push({field: field, displayName: fieldDisplayName});
          }
        }
        return columnDefinitions;
      }

      $scope.getPage();

      $scope.uiGridOptions.onRegisterApi = function (gridApi) {
        $scope.gridApi = gridApi;

        $scope.gridApi.core.on.filterChanged($scope, function () {
          var columns = $scope.gridApi.grid.columns;
          var filters = [];
          for (var i = 0; i < columns.length; i++) {
            var column = columns[i];
            var hasFilters = isArrayWithData(column.filters) && column.filters[0].term != undefined
              && column.filters[0].term != null && column.filters[0].term.trim() !== "";
            if (hasFilters) {
              var filter = {};
              filter[column.field] = column.filters[0].term.trim();
              console.log("filter: " + filter);
              filters.push(filter);
            }
          }
          var filtersChanged = false;
          if ($scope.filters.length != filters.length) {
            filtersChanged = true;
          } else {
            angular.forEach(filters, function (value) {
              if (-1 === $scope.filters.indexOf(value)) {
                filtersChanged = true;
              }
            });
          }
          if (filtersChanged) {
            $scope.filters = filters
            $scope.getPage();
          }
        });

        $scope.gridApi.core.on.sortChanged($scope, function (grid, sortColumns) {
          //TODO handle sorting
          console.log("sort");
          $scope.getPage();
        });

        $scope.gridApi.paging.on.pagingChanged($scope, function (currentPage, pageSize) {
          console.log("page changed: " + currentPage);
          $scope.paginationOptions.pageNumber = currentPage - 1;
          $scope.paginationOptions.pageSize = pageSize;
          $scope.getPage();
        });
      }
      $scope.excelExport = function excelExport() {
        //TODO export grid
      };

    }
  ])

  .factory('GridTranslateService', ['$cookieStore', '$translate', function ($cookieStore, $translate) {
    return {
      translate: function (columnDefinitions, locale) {
        if (!isArrayWithData(columnDefinitions)) {
          return [];
        }
        for (var p = 0; p < columnDefinitions.length; p++) {
          if (columnDefinitions[p].displayName.indexOf("ROW_NUM") > 0) {
            columnDefinitions[p].displayName = $translate.instant("grid.rownum.label");
            columnDefinitions[p].sortable = false;
          } else {
            columnDefinitions[p].displayName = $translate.instant(columnDefinitions[p].displayName);
          }


          if (columnDefinitions[p].fieldType == "java.util.Date") {
            columnDefinitions[p].cellFilter = "date:'" + locale.date + "'";
          }
        }
        return columnDefinitions;
      }
    }
  }])
  .directive('toolbarIcon', ['$translate', function ($translate) {
    return {
      restrict: 'EA',
      scope: {
        class: "@",
        titleKey: "@"
      },

      link: function ($scope, $element) {

        $($element).html(
          "<a class='" + $scope.class + "'  title='" + $translate.instant($scope.titleKey) + "'><i class='" + $scope.class + "'></i></a>"
        );
      }
    }
  }])
;

angular.module('app-grid-html-templates', []).run(['$templateCache', function($templateCache) {
  $templateCache.put("template/app-grid.html",
    "<div class=\"box ui-draggable ui-droppable\"><div class=box-header><div class=box-name><i class=\"fa fa-list-alt\"></i> <span>{{title}}</span></div><div class=box-icons><toolbar-icon class=xls ng-click=excelExport() title-key=excel.download></toolbar-icon><a class=collapse-link><i class=\"fa fa-chevron-up\"></i></a> <a class=expand-link><i class=\"fa fa-expand\"></i></a> <a class=close-link><i class=\"fa fa-times\"></i></a></div><div class=no-move></div></div><div ui-grid=uiGridOptions ui-grid-paging class=gridStyle ng-style=gridStyle></div></div>");
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


