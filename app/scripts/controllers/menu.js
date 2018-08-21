'use strict';

/**
 * @ngdoc function
 * @name udaciMealsApp.controller:MenuCtrl
 * @description
 * # MenuCtrl
 * Controller of the udaciMealsApp
 */
angular.module('udaciMealsApp')
  .controller('MenuCtrl', ['foodFinder', 'orderManager', function (finder, orderManager) {
  	let vm = this;
    // using AngularJS $http:
  	finder.getMenu().then(function(response){
  		vm.items = response.data;
      for (let i=0; i<vm.items.length; i++) {
        finder.getImg(vm.items[i].name).then(function(imgData){
          vm.items[i].img = imgData.data.results[0].urls.small
        })
      }
  	});

    // using fetch()
    // finder.getMenu().then(response => response.json()).then(function(data){
    //   vm.items = data;
    //   console.log(data)
    // });

    this.chooseItem = function(item){
      orderManager.chooseMenuOption(item.meal, item.name)
    };
  	this.increment = function(item) {
  		item.rating = (item.rating*10 + 1)/10
  	};
  	this.decrement = function(item) {
  		item.rating = (item.rating*10 - 1)/10
  	}
  }]);
