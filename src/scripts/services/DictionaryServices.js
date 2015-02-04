/**
 * Created by Mihaela.Petre on 1/30/2015.
 */

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


