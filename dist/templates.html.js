angular.module('app-bootstrap-dictionary-webTemplate.html', []).run(['$templateCache', function($templateCache) {
  "use strict";
  $templateCache.put("template/app-bootstrap-dictionary-web.html",
    "<div>Hey</div>");
  $templateCache.put("template/dictionaries.html",
    "<div><h1>Dictionaries:</h1><br>{{dictionariesHttp}}</div>");
  $templateCache.put("template/gridDictionaries.html",
    "<div>URL: {{url}}<app-grid url=url></app-grid></div>");
}]);
