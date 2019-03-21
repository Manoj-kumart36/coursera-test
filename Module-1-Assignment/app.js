(function(){
    'use strict';

    angular.module('LunchCheck', [])
    .controller('LunchCheckController', LunchController);
    LunchController.$inject = ['$scope'];

    function LunchController($scope){
        $scope.verifyLunchLoad = function(){
            var totalDishCount = findNoOfDishes($scope.DishNames);
            var messageToDisplay = replyMessage(totalDishCount);
            //console.log('messageToDisplay',messageToDisplay);
            $scope.message = messageToDisplay;
        }
    }

    function findNoOfDishes(DishValue){
        var count = 0;
        if(DishValue){
            var separatedDishNames = DishValue.split(',');
            for (var indivualDish in separatedDishNames) {
                if (separatedDishNames[indivualDish].trim().length != 0) {
                  count++;
                }
              }
        }
        //console.log('value', count);
        return count;
    }

    function replyMessage(DishCount){
        if(DishCount <= 3){
            return 'Enjoy!';
        } else {
            return 'Too much!';
        }
    }
})();