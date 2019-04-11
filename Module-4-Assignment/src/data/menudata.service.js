(function () {
'use strict';

angular.module('data')
.service('MenuDataService', MenuDataService);

MenuDataService.$inject = ['$http', 'ApiPath'];
function MenuDataService($http, ApiPath) {
  var service = this;

  service.getAllCategories = function() {
    return $http({
        method: "GET",
        url: (ApiPath + "/categories.json")
    }).then(function (response) {
      return response.data;
    });
  };

  service.getItemsForCategory = function(categoryShortName) {
    return $http({
        method: "GET",
        url: (ApiPath + "/menu_items.json"),
        params: {
            category: categoryShortName
        }
    }).then(function (response) {
      return response.data;
    });
  };
}

})();
