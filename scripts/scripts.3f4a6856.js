'use strict';

/**
 * @ngdoc overview
 * @name udaciMealsApp
 * @description
 * # udaciMealsApp
 *
 * Main module of the application.
 */
angular
  .module('udaciMealsApp', ['ui.router'])
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
  	$urlRouterProvider.otherwise('/')

  	$stateProvider
	  	.state('home', {
	  		url:'/',
	  		templateUrl: 'views/menu.html',
	  		controller: 'MenuCtrl as menu'
	  	})
	  	.state('food', {
	  		url:'/haha/:id',
	  		templateUrl: 'views/item.html',
	  		controller: 'ItemCtrl as item'
	  	})
	  	.state('food.nutrition', {
	  		url: '/nutrition',
	  		templateUrl: 'views/item-nutrition.html'
	  	})	  	
	  	.state('food.reviews', {
	  		url: '/reviews',
	  		templateUrl: 'views/item-reviews.html'
	  	})	  	
  }])

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

'use strict';

/**
 * @ngdoc service
 * @name udaciMealsApp.foodFinder
 * @description
 * # foodFinder
 * Service in the udaciMealsApp.
 */
angular.module('udaciMealsApp')
  .service('foodFinder', ['$http', function ($http) {
    // Using AngularJS $http
    this.getMenu = function() {return $http({method: 'GET', url: './menu/menu-old.json'})}
    // Or using fetch()
    // this.getMenu = function() {return fetch('/menu/menu-old.json')};
    this.getItem = function(id){
        let menuItemFile = '/menu/'+id+'.json';
        return $http({method: 'GET', url: menuItemFile});
    }
    this.getImg = function(searchedForText) {
        return $http({
            method: 'GET',
            url: `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`,
            headers: {
                Authorization: 'Client-ID 873bf2c1d62f2daaa6601ba7b80193a298d82daa562a837ca3d8564d107d5225'
            }
        })
    }
  }]);

'use strict';

/**
 * @ngdoc service
 * @name udaciMealsApp.orderManager
 * @description
 * # orderManager
 * Service in the udaciMealsApp.
 */
angular.module('udaciMealsApp')
  .service('orderManager', function () {
  	var selectedDay = 'Monday'
    var orderSelection = {
    	Mon: {
    		breakfast: '',
    		lunch: '',
    		dinner: ''
    	},
    	Tue: {
    		breakfast: '',
    		lunch: '',
    		dinner: ''    		
    	},
    	Wed: {
    		breakfast: '',
    		lunch: '',
    		dinner: ''    		
    	},
    	Thur: {
    		breakfast: '',
    		lunch: '',
    		dinner: ''    		
    	},
    	Fri: {
    		breakfast: '',
    		lunch: '',
    		dinner: ''    		
    	}   	    	    	
    }
    this.getActiveDay = function(){
    	return selectedDay;
    }
    this.setActiveDay = function(day){
    	selectedDay = day;
    }
    this.chooseMenuOption = function(meal, menuItem){
    	orderSelection[selectedDay][meal] = menuItem;
    }      
    this.removeMenuOption = function(day, menuCategory){
    	orderSelection[day][menuCategory] = '';
    }
    this.getOrders = function(){
    	return orderSelection;
    }          
  });

'use strict';

/**
 * @ngdoc function
 * @name udaciMealsApp.controller:OrderCtrl
 * @description
 * # OrderCtrl
 * Controller of the udaciMealsApp
 */
angular.module('udaciMealsApp')
  .controller('OrderCtrl', ['orderManager', function (orderManager) {
    this.list = orderManager.getOrders();
    this.setDay = function(day){
    	orderManager.setActiveDay(day)
    }
  }]);

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
