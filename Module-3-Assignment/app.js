(function () {
    'use strict'
  
  angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController', NarrowItDownController)
  .service('MenuSearchService', MenuSearchService)
  .directive('foundItems', FoundItemsDirective)
  .constant('databaseUrl', "https://davids-restaurant.herokuapp.com");
  
  
NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService) {
    var narrowCtrl = this;
  
    narrowCtrl.searchMenuItems = function () {
      if (narrowCtrl.searchItem === "" || narrowCtrl.searchItem===undefined) {
        narrowCtrl.found = [];
      } else {
        MenuSearchService.getMatchedMenuItems(narrowCtrl.searchItem)
        .then(function(result) {
          narrowCtrl.found = result;
        });
      }
    }
  
    narrowCtrl.removeItem = function(itemIndex) {
      MenuSearchService.removeItem(itemIndex);
    };
  }
  
function FoundItemsDirective() {
    var ddo = {
      templateUrl: 'foundItems.html',
      scope: {
        items: '<',
        onRemove: '&'
      },
      controller: foundItemsController,
      controllerAs: 'foundCtrl',
      bindToController: true
    };
  
    return ddo;
  }
  
function foundItemsController() {
    var foundCtrl = this;
    foundCtrl.beforeSearch = function() {
      return foundCtrl.items == undefined;
    }
    foundCtrl.nothingFound = function() {
      return foundCtrl.items != undefined && foundCtrl.items.length === 0;
    }
  }
  
MenuSearchService.$inject = ['$http', 'databaseUrl'];

function MenuSearchService($http, databaseUrl) {
    var menuService = this;
    menuService.getMatchedMenuItems = function(searchItem) {
      return $http({
        method: "GET",
        url: (databaseUrl + "/menu_items.json")
      }).then(function(result) {
        var responseItems = result.data.menu_items;
        var foundItems = [];
        for (var index = 0; index < responseItems.length; ++index) {
          if (responseItems[index].description.toLowerCase().indexOf(searchItem.toLowerCase()) >= 0) {
            foundItems.push(responseItems[index]);
          }
        }
        return foundItems;
      });
    };
    menuService.removeItem = function(itemIndex) {
      foundItems.splice(itemIndex, 1);
    };
  }
})();
  