(function () {
    'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController',ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService',ShoppingListCheckOffService)

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService){
    this.items = ShoppingListCheckOffService.getToBuyItemsList();
    console.log('itemmms', this.items);
    this.buy = function(index) {
        ShoppingListCheckOffService.buyItem(index);
      };
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService){
    this.items = ShoppingListCheckOffService.getAlreadyBoughtList();
}

function ShoppingListCheckOffService(){
    var toBuyList = [
        { name: "cookies", quantity: 50 },
        { name: "desk", quantity: 5 },
        { name: "chair", quantity: 10 },
        { name: "water", quantity: 10 },
        { name: "mint", quantity: 35 },
        { name: "watermelon", quantity: 40 }
    ];

    var alreadyBoughtList = [];

    this.buyItem = function(indexValue){
        alreadyBoughtList.push(toBuyList[indexValue]);
        toBuyList.splice(indexValue, 1);
    }

    this.getToBuyItemsList = function(){
        console.log('Is it coming here');
        return toBuyList;
    }

    this.getAlreadyBoughtList = function(){
        return alreadyBoughtList;
    }
}

})();