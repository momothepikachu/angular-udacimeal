'use strict';

/**
 * @ngdoc function
 * @name udaciMealsApp.controller:ItemCtrl
 * @description
 * # ItemCtrl
 * Controller of the udaciMealsApp
 */
angular.module('udaciMealsApp')
  .controller('ItemCtrl', ['$stateParams', 'foodFinder', function ($stateParams, foodFinder) {
    let vm = this;
    foodFinder.getItem($stateParams.id).then(function(response){
    	vm.data = response.data
    	foodFinder.getImg(response.data.name).then(function(imgData){
    		vm.data.img = imgData.data.results[0].urls.small
    	})
    	
    })
  }]);
